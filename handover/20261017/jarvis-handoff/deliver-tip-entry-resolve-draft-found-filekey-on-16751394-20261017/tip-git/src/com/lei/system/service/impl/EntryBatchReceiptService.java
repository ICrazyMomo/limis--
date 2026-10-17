/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.fasterxml.jackson.core.type.TypeReference
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  com.lei.common.exception.ServiceException
 *  org.springframework.jdbc.core.JdbcTemplate
 *  org.springframework.stereotype.Service
 *  org.springframework.transaction.PlatformTransactionManager
 *  org.springframework.transaction.support.TransactionTemplate
 */
package com.lei.system.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lei.common.exception.ServiceException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

@Service
public class EntryBatchReceiptService {
    private final JdbcTemplate jdbc;
    private final TransactionTemplate transaction;
    private final ObjectMapper json = new ObjectMapper();

    public EntryBatchReceiptService(JdbcTemplate jdbc, PlatformTransactionManager manager) {
        this.jdbc = jdbc;
        this.transaction = new TransactionTemplate(manager);
        this.transaction.setPropagationBehavior(3);
    }

    public String registerGeneration(String fileKey, Long actor, Map<String, Object> source, String manifest, byte[] bytes) {
        if (actor == null || actor <= 0L || bytes == null || bytes.length == 0) {
            throw this.conflict("\u751f\u6210\u6765\u6e90\u4e0d\u5b8c\u6574");
        }
        this.rows(source);
        String serialized = this.encode(source);
        String hash = EntryBatchReceiptService.sha(serialized.getBytes(StandardCharsets.UTF_8));
        this.jdbc.update("insert into entry_batch_source(file_key,actor_id,source_json,source_sha256,layout_manifest,generation_bytes) values(?,?,?,?,?,?)", new Object[]{fileKey, actor, serialized, hash, manifest, bytes});
        return hash;
    }

    public boolean exists(String fileKey) {
        return !this.jdbc.queryForList("select file_key from entry_batch_source where file_key=?", new Object[]{fileKey}).isEmpty();
    }

    public Map<String, Object> source(String fileKey, Long actor) {
        return this.decode(this.text(this.requireSource(fileKey, actor, false), "source_json"));
    }

    public Map<String, Object> findActiveDraft(Long actor, String kind, Long templateId, Set<String> rowKeys) {
        LinkedHashMap<String, Object> none = new LinkedHashMap<String, Object>();
        none.put("found", false);
        if (actor == null || actor <= 0L || templateId == null || templateId <= 0L || rowKeys == null || rowKeys.isEmpty() || kind == null || kind.isEmpty()) {
            return none;
        }
        List sources;
        try {
            sources = this.jdbc.queryForList("select file_key, source_json, source_sha256, created_at from entry_batch_source where actor_id=? order by created_at desc, file_key desc", new Object[]{actor});
        }
        catch (RuntimeException error) {
            // 缺表/SQL 异常：fail-soft，继续权威回读键映射；不抛未知异常
            sources = Collections.EMPTY_LIST;
        }
        for (Object rawRow : sources) {
            Map row = (Map)rawRow;
            String fileKey;
            Map<String, Object> file;
            Set<String> actual;
            Map<String, Object> decoded;
            try {
                decoded = this.decode(this.text(row, "source_json"));
            }
            catch (RuntimeException error) {
                continue;
            }
            if (!kind.equals(this.text(decoded, "kind")) || !String.valueOf(templateId).equals(this.text(decoded, "templateId")) || (actual = this.generationKeys(decoded)) == null || !actual.equals(rowKeys) || (file = this.liveEditFile(fileKey = this.text(row, "file_key"), actor, kind, templateId)) == null) continue;
            if (!this.formsStillDraft(kind, actor, actual)) {
                // 编辑草稿已非 DRAFT：跳过该来源，继续扫 / 回退权威回读键
                continue;
            }
            LinkedHashMap<String, Object> found = new LinkedHashMap<String, Object>();
            found.put("found", true);
            found.put("fileKey", fileKey);
            found.put("sourceReceiptSha256", this.text(row, "source_sha256"));
            if (file.get("id") instanceof Number) {
                found.put("tempfileId", ((Number)file.get("id")).longValue());
            }
            found.put("generationRows", this.slimRows(actual));
            return found;
        }
        Map<String, Object> readback = this.findAuthoritativeReadback(templateId, rowKeys, kind);
        if (readback != null) {
            return readback;
        }
        return none;
    }

    /**
     * 乙-B：将权威回读键（sys_temp_file.business_table_name=sys_lab_entry_readback_{templateId}）
     * 映射进契约 found+fileKey。只读查询，不生成/不覆盖簿。缺行→null（上层变 found:false）。
     */
    private Map<String, Object> findAuthoritativeReadback(Long templateId, Set<String> rowKeys, String kind) {
        if (!"lab".equals(kind) || templateId == null || templateId <= 0L || rowKeys == null || rowKeys.isEmpty()) {
            return null;
        }
        String business = "sys_lab_entry_readback_" + templateId;
        String sharedFileKey = null;
        Long tempfileId = null;
        for (String key : rowKeys) {
            Long foreignKey = this.positiveId(key);
            if (foreignKey == null) {
                return null;
            }
            List files;
            try {
                files = this.jdbc.queryForList("select id, file_key, business_table_name, file_type, del_flag, create_user, file_id from sys_temp_file where foreign_key=? and file_type='06' and del_flag='0' and business_table_name=?", new Object[]{foreignKey, business});
            }
            catch (RuntimeException error) {
                return null;
            }
            if (files == null || files.size() != 1) {
                return null;
            }
            Map file = (Map)files.get(0);
            String fileKey = this.text(file, "file_key");
            if (fileKey.isEmpty()) {
                return null;
            }
            String fileId = this.text(file, "file_id");
            if (!fileId.isEmpty() && !String.valueOf(templateId).equals(fileId)) {
                return null;
            }
            if (sharedFileKey == null) {
                sharedFileKey = fileKey;
                if (file.get("id") instanceof Number) {
                    tempfileId = ((Number)file.get("id")).longValue();
                }
            } else if (!sharedFileKey.equals(fileKey)) {
                return null;
            }
        }
        if (sharedFileKey == null) {
            return null;
        }
        LinkedHashMap<String, Object> found = new LinkedHashMap<String, Object>();
        found.put("found", true);
        found.put("fileKey", sharedFileKey);
        if (tempfileId != null) {
            found.put("tempfileId", tempfileId);
        }
        found.put("generationRows", this.slimRows(rowKeys));
        return found;
    }

    public String manifest(String fileKey, Long actor) {
        return this.text(this.requireSource(fileKey, actor, false), "layout_manifest");
    }

    public void registerSession(String fileKey, Long actor, String documentKey, String expectedContentSha256) {
        if (expectedContentSha256 == null || !expectedContentSha256.matches("[0-9a-f]{64}")) {
            throw this.conflict("\u7f16\u8f91\u914d\u7f6e\u7f3a\u5c11\u53ef\u6838\u5bf9\u7684\u5b9e\u9645\u6587\u4ef6\u6458\u8981");
        }
        this.transaction.execute(status -> {
            Map<String, Object> source = this.requireSource(fileKey, actor, true);
            List files = this.jdbc.queryForList("select file_date,create_user from sys_temp_file where file_key=? and file_type='06' and del_flag='0'", new Object[]{fileKey});
            if (files.size() != 1 || this.number(((Map)files.get(0)).get("create_user")) != actor.longValue() || !(((Map)files.get(0)).get("file_date") instanceof byte[]) || !expectedContentSha256.equals(EntryBatchReceiptService.sha((byte[])((Map)files.get(0)).get("file_date")))) {
                throw this.conflict("\u914d\u7f6e\u8bfb\u53d6\u671f\u95f4\u6587\u4ef6\u5df2\u4fdd\u5b58\uff0c\u8bf7\u91cd\u65b0\u6253\u5f00\u6838\u5bf9\u7f16\u8f91\u4f1a\u8bdd");
            }
            if (!Objects.equals(source.get("current_document_key"), documentKey) && !this.jdbc.queryForList("select row_key from entry_batch_commit_row where file_key=? and state='PENDING'", new Object[]{fileKey}).isEmpty()) {
                throw this.conflict("\u539f\u63d0\u4ea4\u5c1a\u672a\u5b8c\u6210\uff0c\u8bf7\u5148\u6838\u5bf9\u5e76\u7ee7\u7eed\u539f\u8bf7\u6c42\uff0c\u518d\u6253\u5f00\u65b0\u7f16\u8f91\u4f1a\u8bdd");
            }
            this.jdbc.update("update entry_batch_source set current_document_key=? where file_key=?", new Object[]{documentKey, fileKey});
            return null;
        });
    }

    public boolean beginSave(String fileKey, String documentKey, String requestId, Long actor) {
        this.validRequest(requestId);
        return (Boolean)this.transaction.execute(status -> {
            Map<String, Object> source = this.requireSource(fileKey, actor, true);
            List<Map<String, Object>> existing = this.saveRows(fileKey, requestId);
            if (!existing.isEmpty()) {
                this.assertSaveIdentity(existing.get(0), source, actor, documentKey);
                return false;
            }
            if (!Objects.equals(documentKey, source.get("current_document_key"))) {
                throw this.conflict("\u7f16\u8f91\u4f1a\u8bdd\u672a\u7b7e\u53d1\u6216\u5df2\u88ab\u91cd\u65b0\u6253\u5f00\u7684\u4f1a\u8bdd\u66ff\u4ee3\uff0c\u8bf7\u5237\u65b0\u6838\u5bf9");
            }
            if (!this.jdbc.queryForList("select row_key from entry_batch_commit_row where file_key=? and state='PENDING'", new Object[]{fileKey}).isEmpty()) {
                throw this.conflict("\u539f\u63d0\u4ea4\u5c1a\u672a\u5b8c\u6210\uff0c\u8bf7\u5148\u6838\u5bf9\u5e76\u7ee7\u7eed\u539f\u8bf7\u6c42");
            }
            long sequence = this.number(source.get("save_sequence")) + 1L;
            this.jdbc.update("update entry_batch_source set save_sequence=? where file_key=?", new Object[]{sequence, fileKey});
            this.jdbc.update("insert into entry_batch_save(file_key,request_id,actor_id,document_key,source_sha256,save_sequence,state) values(?,?,?,?,?,?,?)", new Object[]{fileKey, requestId, actor, documentKey, source.get("source_sha256"), sequence, "PENDING"});
            return true;
        });
    }

    public void requireCallback(String fileKey, String documentKey, String requestId, Long actor) {
        Map<String, Object> source = this.requireSource(fileKey, actor, false);
        this.assertSaveIdentity(this.requireSave(fileKey, requestId), source, actor, documentKey);
    }

    public void capture(String fileKey, String documentKey, String requestId, Long actor, byte[] bytes) {
        if (bytes == null || bytes.length == 0) {
            throw this.conflict("\u4fdd\u5b58\u56de\u8c03\u6ca1\u6709\u5b9e\u9645\u6587\u4ef6\u5b57\u8282");
        }
        this.transaction.execute(status -> {
            Map<String, Object> source = this.requireSource(fileKey, actor, true);
            Map<String, Object> save = this.requireSave(fileKey, requestId);
            this.assertSaveIdentity(save, source, actor, documentKey);
            String hash = EntryBatchReceiptService.sha(bytes);
            if ("CAPTURED".equals(save.get("state"))) {
                if (!hash.equals(save.get("saved_sha256"))) {
                    throw this.conflict("\u540c\u4e00\u4fdd\u5b58\u8bf7\u6c42\u6536\u5230\u4e0d\u540c\u6587\u4ef6\uff0c\u5df2\u62d2\u7edd\u8986\u76d6\u539f\u6536\u636e");
                }
                return null;
            }
            this.requireCurrent(source, save);
            if (this.jdbc.update("update sys_temp_file set file_date=?,update_user=?,update_time=CURRENT_TIMESTAMP where file_key=? and create_user=? and file_type='06' and del_flag='0'", new Object[]{bytes, actor, fileKey, actor}) != 1) {
                throw this.conflict("\u6279\u91cf\u6587\u4ef6\u8eab\u4efd\u5df2\u53d8\u5316");
            }
            if (this.jdbc.update("update entry_batch_save set state='CAPTURED',saved_bytes=?,saved_sha256=?,captured_at=CURRENT_TIMESTAMP where file_key=? and request_id=? and state='PENDING'", new Object[]{bytes, hash, fileKey, requestId}) != 1) {
                throw this.conflict("\u4fdd\u5b58\u8bf7\u6c42\u72b6\u6001\u5df2\u53d8\u5316\uff0c\u539f\u6587\u4ef6\u548c\u6536\u636e\u5747\u672a\u4fee\u6539");
            }
            return null;
        });
    }

    public Map<String, Object> originalSave(String fileKey, String requestId, Long actor) {
        Map<String, Object> source = this.requireSource(fileKey, actor, false);
        Map<String, Object> save = this.requireSave(fileKey, requestId);
        this.assertSaveIdentity(save, source, actor, this.text(save, "document_key"));
        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object>();
        result.put("fileKey", fileKey);
        result.put("requestId", requestId);
        result.put("actor", actor);
        result.put("documentKey", save.get("document_key"));
        result.put("originSourceSha256", save.get("source_sha256"));
        result.put("state", save.get("state"));
        result.put("savedContentSha256", save.get("saved_sha256"));
        result.put("originalSource", this.decode(this.text(source, "source_json")));
        return result;
    }

    public Map<String, Object> status(String fileKey, String requestId, Long actor) {
        Map<String, Object> source = this.requireSource(fileKey, actor, false);
        Map<String, Object> save = this.requireSave(fileKey, requestId);
        this.assertSaveIdentity(save, source, actor, this.text(save, "document_key"));
        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object>();
        result.put("fileKey", fileKey);
        result.put("saveRequestId", requestId);
        result.put("documentKey", save.get("document_key"));
        result.put("status", "CAPTURED".equals(save.get("state")) ? "COMPLETED" : "PENDING");
        result.put("contentSha256", save.get("saved_sha256"));
        result.put("sourceReceiptSha256", save.get("source_sha256"));
        boolean current = this.current(source, save);
        result.put("canCommit", current);
        if ("CAPTURED".equals(save.get("state"))) {
            result.put("originalState", "CAPTURED");
        }
        return result;
    }

    public byte[] savedBytes(String fileKey, String requestId, Long actor) {
        Map<String, Object> source = this.requireSource(fileKey, actor, false);
        Map<String, Object> save = this.requireSave(fileKey, requestId);
        this.assertSaveIdentity(save, source, actor, this.text(save, "document_key"));
        if (!"CAPTURED".equals(save.get("state"))) {
            throw this.conflict("\u539f\u4fdd\u5b58\u56de\u8c03\u5c1a\u672a\u5b8c\u6210\uff0c\u8bf7\u67e5\u8be2\u539f\u8bf7\u6c42");
        }
        byte[] bytes = (byte[])save.get("saved_bytes");
        if (bytes == null || !EntryBatchReceiptService.sha(bytes).equals(save.get("saved_sha256"))) {
            throw this.conflict("\u4fdd\u5b58\u5b57\u8282\u4e0e\u6536\u636e\u4e0d\u4e00\u81f4");
        }
        return bytes;
    }

    public Map<String, Object> commit(String fileKey, String requestId, Long actor, List<Map<String, Object>> parsedRows, RowWriter writer) {
        this.validRequest(requestId);
        this.transaction.execute(status -> {
            Map<String, Object> sourceRow = this.requireSource(fileKey, actor, true);
            Map<String, Object> save = this.requireSave(fileKey, requestId);
            this.assertSaveIdentity(save, sourceRow, actor, this.text(save, "document_key"));
            if (!this.jdbc.queryForList("select request_id from entry_batch_commit where file_key=? and request_id=?", new Object[]{fileKey, requestId}).isEmpty()) {
                return false;
            }
            if (!this.jdbc.queryForList("select row_key from entry_batch_commit_row where file_key=? and state='PENDING'", new Object[]{fileKey}).isEmpty()) {
                throw this.conflict("\u8be5\u5de5\u4f5c\u7c3f\u4ecd\u6709\u672a\u5b8c\u6210\u7684\u539f\u63d0\u4ea4\uff0c\u8bf7\u5148\u6838\u5bf9\u5e76\u7ee7\u7eed\u539f\u8bf7\u6c42");
            }
            this.requireCurrent(sourceRow, save);
            this.savedBytes(fileKey, requestId, actor);
            Map<String, Object> source = this.decode(this.text(sourceRow, "source_json"));
            Set<String> expected = this.rows(source);
            LinkedHashSet<String> actual = new LinkedHashSet<String>();
            for (Map row : parsedRows) {
                String key = this.text(row, "__rowKey");
                if (actual.add(key)) continue;
                throw this.conflict("\u5de5\u4f5c\u7c3f\u51fa\u73b0\u91cd\u590d\u884c\uff0c\u8bf7\u6838\u5bf9\u539f\u751f\u6210\u6587\u4ef6");
            }
            if (!expected.equals(actual)) {
                throw this.conflict("\u5de5\u4f5c\u7c3f\u884c\u96c6\u5408\u4e0e\u539f\u751f\u6210\u6765\u6e90\u4e0d\u4e00\u81f4");
            }
            this.jdbc.update("insert into entry_batch_commit(file_key,request_id,actor_id,source_sha256,saved_sha256) values(?,?,?,?,?)", new Object[]{fileKey, requestId, actor, sourceRow.get("source_sha256"), save.get("saved_sha256")});
            int ordinal = 0;
            for (String key : expected) {
                this.jdbc.update("insert into entry_batch_commit_row(file_key,request_id,row_key,ordinal_no,state,expected_version) values(?,?,?,?,?,?)", new Object[]{fileKey, requestId, key, ordinal++, "PENDING", this.expectedVersion(fileKey, key, this.sourceFor(source, key))});
            }
            return true;
        });
        for (Map<String, Object> row : parsedRows) {
            String key = this.text(row, "__rowKey");
            try {
                this.transaction.execute(status -> {
                    Map<String, Object> sourceRow = this.requireSource(fileKey, actor, true);
                    Map anchor = this.jdbc.queryForMap("select * from entry_batch_commit_row where file_key=? and request_id=? and row_key=? for update", new Object[]{fileKey, requestId, key});
                    if (!"PENDING".equals(anchor.get("state"))) {
                        return null;
                    }
                    this.requireCurrent(sourceRow, this.requireSave(fileKey, requestId));
                    Map<String, Object> source = this.decode(this.text(sourceRow, "source_json"));
                    Map<String, Object> frozen = this.sourceFor(source, key);
                    this.requireTask(this.text(source, "kind"), this.number(frozen.get("taskId")), actor, true);
                    Map<String, Object> before = this.form(source, frozen, true);
                    long expected = this.number(anchor.get("expected_version"));
                    this.assertForm(before, frozen, actor, expected);
                    LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object>();
                    result.put("rowKey", key);
                    result.put("status", "OK");
                    result.putAll(writer.write(key, row));
                    Map<String, Object> after = this.form(source, frozen, true);
                    long version = this.number(after.get("version"));
                    if (version <= expected) {
                        throw this.conflict("\u4e1a\u52a1\u5199\u5165\u672a\u5f62\u6210\u65b0\u7684\u8868\u5355\u7248\u672c");
                    }
                    if (this.jdbc.update("update entry_batch_commit_row set state='OK',result_json=?,after_version=? where file_key=? and request_id=? and row_key=? and state='PENDING'", new Object[]{this.encode(result), version, fileKey, requestId, key}) != 1) {
                        throw this.conflict("\u539f\u884c\u7ed3\u679c\u5df2\u5b58\u5728\uff0c\u7981\u6b62\u91cd\u590d\u5199\u5165");
                    }
                    return null;
                });
            }
            catch (ServiceException error) {
                this.transaction.execute(status -> {
                    this.requireSource(fileKey, actor, true);
                    LinkedHashMap<String, String> result = new LinkedHashMap<String, String>();
                    result.put("rowKey", key);
                    result.put("status", "FAILED");
                    result.put("reason", error.getMessage());
                    this.jdbc.update("update entry_batch_commit_row set state='FAILED',result_json=? where file_key=? and request_id=? and row_key=? and state='PENDING'", new Object[]{this.encode(result), fileKey, requestId, key});
                    return null;
                });
            }
        }
        return this.originalCommit(fileKey, requestId, actor);
    }

    public Map<String, Object> originalCommit(String fileKey, String requestId, Long actor) {
        boolean allowed;
        Map<String, Object> source = this.requireSource(fileKey, actor, false);
        List commits = this.jdbc.queryForList("select * from entry_batch_commit where file_key=? and request_id=?", new Object[]{fileKey, requestId});
        if (commits.size() != 1) {
            throw this.conflict("\u539f\u63d0\u4ea4\u5c1a\u65e0\u53ef\u786e\u8ba4\u7684\u6301\u4e45\u7ed3\u679c\uff0c\u8bf7\u4fdd\u7559\u539f\u8bf7\u6c42\u7ee7\u7eed\u6838\u5bf9");
        }
        Map commit = (Map)commits.get(0);
        if (this.number(commit.get("actor_id")) != actor.longValue() || !Objects.equals(source.get("source_sha256"), commit.get("source_sha256"))) {
            throw this.conflict("\u539f\u63d0\u4ea4\u8eab\u4efd\u4e0d\u4e00\u81f4");
        }
        List records = this.jdbc.queryForList("select * from entry_batch_commit_row where file_key=? and request_id=? order by ordinal_no", new Object[]{fileKey, requestId});
        if (records.size() != this.rows(this.decode(this.text(source, "source_json"))).size()) {
            throw this.conflict("\u539f\u63d0\u4ea4\u884c\u8bc1\u636e\u4e0d\u5b8c\u6574");
        }
        ArrayList<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
        int ok = 0;
        int failed = 0;
        boolean pending = false;
        for (Object rawRecord : records) {
            Map record = (Map)rawRecord;
            if ("PENDING".equals(record.get("state"))) {
                pending = true;
                LinkedHashMap row = new LinkedHashMap();
                row.put("rowKey", record.get("row_key"));
                row.put("status", "PENDING");
                results.add(row);
                continue;
            }
            if (!"OK".equals(record.get("state")) && !"FAILED".equals(record.get("state"))) {
                throw this.conflict("\u539f\u63d0\u4ea4\u884c\u72b6\u6001\u672a\u77e5");
            }
            results.add(this.decode(this.text(record, "result_json")));
            if ("OK".equals(record.get("state"))) {
                ++ok;
                continue;
            }
            ++failed;
        }
        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object>();
        result.put("fileKey", fileKey);
        result.put("saveRequestId", requestId);
        result.put("sourceReceiptSha256", commit.get("source_sha256"));
        result.put("savedContentSha256", commit.get("saved_sha256"));
        result.put("originalSource", this.decode(this.text(source, "source_json")));
        result.put("rows", results);
        result.put("total", results.size());
        result.put("ok", ok);
        result.put("failed", failed);
        result.put("state", pending ? "PENDING" : "COMPLETED");
        boolean bl = allowed = pending && this.current(source, this.requireSave(fileKey, requestId));
        if (allowed) {
            Map<String, Object> frozenSource = this.decode(this.text(source, "source_json"));
            try {
                for (Object rawRecord : records) {
            Map record = (Map)rawRecord;
                    if (!"PENDING".equals(record.get("state"))) continue;
                    Map<String, Object> frozen = this.sourceFor(frozenSource, this.text(record, "row_key"));
                    this.requireTask(this.text(frozenSource, "kind"), this.number(frozen.get("taskId")), actor, false);
                    this.assertForm(this.form(frozenSource, frozen, false), frozen, actor, this.number(record.get("expected_version")));
                }
            }
            catch (ServiceException error) {
                allowed = false;
                result.put("resumeBlockedReason", error.getMessage());
            }
        }
        result.put("canResume", allowed);
        return result;
    }

    public Map<String, Object> freezeForm(String kind, String rowKey, Long actor) {
        List found;
        String table = this.formTable(kind);
        int split = rowKey.indexOf(124);
        Long taskId = "sampling".equals(kind) ? Long.valueOf(rowKey.substring(0, split)) : Long.valueOf(rowKey);
        this.requireTask(kind, taskId, actor, true);
        List list = found = "sampling".equals(kind) ? this.jdbc.queryForList("select * from " + table + " where task_list_id=? and sample_no=? for update", new Object[]{Long.valueOf(rowKey.substring(0, split)), rowKey.substring(split + 1)}) : this.jdbc.queryForList("select * from " + table + " where lab_task_list_id=? for update", new Object[]{Long.valueOf(rowKey)});
        if (found.size() != 1) {
            throw this.conflict("\u5b9e\u9645\u5f55\u5165\u8868\u5355\u4e0d\u5b58\u5728\u6216\u4e0d\u552f\u4e00");
        }
        Map form = (Map)found.get(0);
        if (this.number(form.get("operator_user_id")) != actor.longValue() || !"DRAFT".equals(form.get("status"))) {
            throw new ServiceException("\u53ea\u6709\u672c\u4eba\u8349\u7a3f\u53ef\u751f\u6210\u6279\u91cf\u5f55\u5165\u6765\u6e90", Integer.valueOf(403));
        }
        LinkedHashMap<String, Object> frozen = new LinkedHashMap<String, Object>();
        frozen.put("rowKey", rowKey);
        frozen.put("taskId", "sampling".equals(kind) ? form.get("task_list_id") : form.get("lab_task_list_id"));
        if ("sampling".equals(kind)) {
            frozen.put("sampleNo", form.get("sample_no"));
        }
        frozen.put("formId", form.get("id"));
        frozen.put("version", form.get("version"));
        frozen.put("operatorUserId", actor);
        frozen.put("templateId", form.get("template_id"));
        frozen.put("templateVersion", form.get("template_version"));
        frozen.put("templateFileSha256", form.get("template_file_sha256"));
        frozen.put("fieldMappingVersion", form.get("field_mapping_version"));
        frozen.put("valuesJson", this.text(form, "values_json"));
        frozen.put("fieldSnapshotSha256", EntryBatchReceiptService.sha(this.text(form, "field_snapshot_json").getBytes(StandardCharsets.UTF_8)));
        return frozen;
    }

    public void requireTask(String kind, Long taskId, Long actor, boolean lock) {
        String table = "sampling".equals(kind) ? "sys_order_task_list" : ("lab".equals(kind) ? "lab_task_list" : null);
        if (table == null || actor == null || actor <= 0L) {
            throw new ServiceException("\u7f3a\u5c11\u5b9e\u9645\u4efb\u52a1\u804c\u8d23", Integer.valueOf(403));
        }
        List found = this.jdbc.queryForList("select * from " + table + " where id=?" + (lock ? " for update" : ""), new Object[]{taskId});
        if (found.size() != 1 || !"0".equals(((Map)found.get(0)).get("del_flag"))) {
            throw new ServiceException("\u4efb\u52a1\u4e0d\u5b58\u5728\u6216\u5df2\u5220\u9664", Integer.valueOf(403));
        }
        Map task = (Map)found.get(0);
        if ("lab".equals(kind)) {
            if (!String.valueOf(actor).equals(this.text(task, "ssy_user_id")) || !"02".equals(task.get("lab_task_list_status"))) {
                throw new ServiceException("\u5b9e\u9a8c\u4efb\u52a1\u5df2\u4e0d\u5c5e\u4e8e\u672c\u4eba\u8fdb\u884c\u4e2d\u8303\u56f4", Integer.valueOf(403));
            }
        } else {
            boolean assigned = String.valueOf(actor).equals(this.text(task, "sampler_user_id")) || String.valueOf(actor).equals(this.text(task, "leader_id"));
            for (String member : this.text(task, "member_ids").split(",")) {
                if (!String.valueOf(actor).equals(member.trim())) continue;
                assigned = true;
            }
            if (!assigned || !"00".equals(task.get("order_task_status"))) {
                throw new ServiceException("\u91c7\u6837\u4efb\u52a1\u5df2\u4e0d\u5c5e\u4e8e\u672c\u4eba\u8fdb\u884c\u4e2d\u8303\u56f4", Integer.valueOf(403));
            }
        }
    }

    private long expectedVersion(String fileKey, String key, Map<String, Object> frozen) {
        List previous = this.jdbc.queryForList("select max(after_version) as v from entry_batch_commit_row where file_key=? and row_key=? and state='OK'", new Object[]{fileKey, key});
        Object version = ((Map)previous.get(0)).get("v");
        return version == null ? this.number(frozen.get("version")) : this.number(version);
    }

    private Map<String, Object> form(Map<String, Object> source, Map<String, Object> frozen, boolean lock) {
        List found = this.jdbc.queryForList("select * from " + this.formTable(this.text(source, "kind")) + " where id=?" + (lock ? " for update" : ""), new Object[]{frozen.get("formId")});
        if (found.size() != 1) {
            throw this.conflict("\u539f\u6765\u6e90\u8868\u5355\u5df2\u4e0d\u5b58\u5728");
        }
        return (Map)found.get(0);
    }

    private void assertForm(Map<String, Object> form, Map<String, Object> frozen, Long actor, long version) {
        String[][] fields;
        Object taskId;
        Object object = taskId = form.containsKey("task_list_id") ? form.get("task_list_id") : form.get("lab_task_list_id");
        if (!String.valueOf(taskId).equals(String.valueOf(frozen.get("taskId"))) || form.containsKey("sample_no") && !Objects.equals(form.get("sample_no"), frozen.get("sampleNo"))) {
            throw this.conflict("\u539f\u6765\u6e90\u4efb\u52a1\u6216\u6837\u54c1\u8eab\u4efd\u5df2\u53d8\u5316");
        }
        if (this.number(form.get("operator_user_id")) != actor.longValue() || !"DRAFT".equals(form.get("status")) || this.number(form.get("version")) != version) {
            throw this.conflict("\u5f55\u5165\u4eba\u3001\u8349\u7a3f\u72b6\u6001\u6216\u6765\u6e90\u7248\u672c\u5df2\u53d8\u5316\uff0c\u8bf7\u91cd\u65b0\u751f\u6210\u6838\u5bf9");
        }
        for (String[] field : fields = new String[][]{{"template_id", "templateId"}, {"template_version", "templateVersion"}, {"template_file_sha256", "templateFileSha256"}, {"field_mapping_version", "fieldMappingVersion"}}) {
            if (this.text(form, field[0]).equals(this.text(frozen, field[1]))) continue;
            throw this.conflict("\u8868\u5355\u6a21\u677f\u5feb\u7167\u5df2\u53d8\u5316");
        }
        if (!EntryBatchReceiptService.sha(this.text(form, "field_snapshot_json").getBytes(StandardCharsets.UTF_8)).equals(frozen.get("fieldSnapshotSha256"))) {
            throw this.conflict("\u8868\u5355\u5b57\u6bb5\u5feb\u7167\u5df2\u53d8\u5316");
        }
    }

    private Map<String, Object> requireSource(String fileKey, Long actor, boolean lock) {
        if (actor == null || actor <= 0L) {
            throw new ServiceException("\u7f3a\u5c11\u5b9e\u9645\u767b\u5f55\u8eab\u4efd", Integer.valueOf(403));
        }
        List found = this.jdbc.queryForList("select * from entry_batch_source where file_key=?" + (lock ? " for update" : ""), new Object[]{fileKey});
        if (found.size() != 1) {
            throw this.conflict("\u8be5\u5386\u53f2\u6587\u4ef6\u6ca1\u6709\u6301\u4e45\u6765\u6e90\u8bc1\u636e\uff0c\u8bf7\u91cd\u65b0\u751f\u6210\u6279\u91cf\u5de5\u4f5c\u7c3f");
        }
        Map row = (Map)found.get(0);
        if (this.number(row.get("actor_id")) != actor.longValue()) {
            throw new ServiceException("\u6279\u91cf\u6765\u6e90\u4e0d\u5c5e\u4e8e\u5f53\u524d\u8d26\u53f7", Integer.valueOf(403));
        }
        return row;
    }

    private List<Map<String, Object>> saveRows(String fileKey, String requestId) {
        return this.jdbc.queryForList("select * from entry_batch_save where file_key=? and request_id=?", new Object[]{fileKey, requestId});
    }

    private Map<String, Object> requireSave(String fileKey, String requestId) {
        this.validRequest(requestId);
        List<Map<String, Object>> found = this.saveRows(fileKey, requestId);
        if (found.size() != 1) {
            throw this.conflict("\u539f\u4fdd\u5b58\u8bf7\u6c42\u4e0d\u5b58\u5728\uff0c\u8bf7\u4fdd\u7559\u539f\u8bf7\u6c42\u6838\u5bf9");
        }
        Map<String, Object> save = found.get(0);
        if (!"PENDING".equals(save.get("state")) && !"CAPTURED".equals(save.get("state"))) {
            throw this.conflict("\u539f\u4fdd\u5b58\u8bf7\u6c42\u72b6\u6001\u65e0\u6cd5\u786e\u8ba4\uff0c\u7981\u6b62\u7ee7\u7eed\u4fee\u6539");
        }
        return save;
    }

    private void assertSaveIdentity(Map<String, Object> save, Map<String, Object> source, Long actor, String documentKey) {
        if (this.number(save.get("actor_id")) != actor.longValue() || !Objects.equals(documentKey, save.get("document_key")) || !Objects.equals(source.get("source_sha256"), save.get("source_sha256"))) {
            throw this.conflict("\u540c\u4e00\u4fdd\u5b58\u8bf7\u6c42\u7684\u8d26\u53f7\u3001\u4f1a\u8bdd\u6216\u6765\u6e90\u4e0d\u4e00\u81f4");
        }
    }

    private boolean current(Map<String, Object> source, Map<String, Object> save) {
        if (!Objects.equals(source.get("current_document_key"), save.get("document_key")) || this.number(source.get("save_sequence")) != this.number(save.get("save_sequence"))) {
            return false;
        }
        if (!"CAPTURED".equals(save.get("state"))) {
            return true;
        }
        List files = this.jdbc.queryForList("select file_date,create_user from sys_temp_file where file_key=? and file_type='06' and del_flag='0'", new Object[]{source.get("file_key")});
        return files.size() == 1 && this.number(((Map)files.get(0)).get("create_user")) == this.number(source.get("actor_id")) && ((Map)files.get(0)).get("file_date") instanceof byte[] && EntryBatchReceiptService.sha((byte[])((Map)files.get(0)).get("file_date")).equals(save.get("saved_sha256"));
    }

    private void requireCurrent(Map<String, Object> source, Map<String, Object> save) {
        if (!this.current(source, save)) {
            throw this.conflict("\u539f\u4fdd\u5b58\u5df2\u88ab\u540e\u7eed\u7f16\u8f91\u4f1a\u8bdd\u6216\u4fdd\u5b58\u66ff\u4ee3\uff0c\u8bf7\u6838\u5bf9\u539f\u8bf7\u6c42");
        }
    }

    private String formTable(String kind) {
        if ("sampling".equals(kind)) {
            return "sampling_entry_form";
        }
        if ("lab".equals(kind)) {
            return "lab_entry_form";
        }
        throw this.conflict("\u672a\u77e5\u5f55\u5165\u6765\u6e90\u7c7b\u578b");
    }

    private Map<String, Object> sourceFor(Map<String, Object> source, String key) {
        Object values = source.get("sources");
        if (values instanceof List) {
            for (Object value : (List)values) {
                Map map = (Map)value;
                if (!key.equals(map.get("rowKey"))) continue;
                return map;
            }
        }
        throw this.conflict("\u8be5\u884c\u4e0d\u5b58\u5728\u4e8e\u51bb\u7ed3\u6765\u6e90");
    }

    private static String editBusinessPrefix(String kind, Long templateId) {
        String base = "lab".equals(kind) ? "sys_batch_entry_lab_" : "sys_batch_entry_sampling_";
        return base + templateId;
    }

    private Map<String, Object> liveEditFile(String fileKey, Long actor, String kind, Long templateId) {
        if (fileKey.isEmpty()) {
            return null;
        }
        List files = this.jdbc.queryForList("select id, file_key, business_table_name, file_type, del_flag, create_user, file_id from sys_temp_file where file_key=?", new Object[]{fileKey});
        if (files.size() != 1) {
            return null;
        }
        Map file = (Map)files.get(0);
        if (!("0".equals(this.text(file, "del_flag")) && "06".equals(this.text(file, "file_type")) && this.sameNumber(file.get("create_user"), actor))) {
            return null;
        }
        String business = this.text(file, "business_table_name");
        if (business.startsWith("sys_lab_entry_view_cache_") || business.startsWith("sys_lab_entry_readback_")) {
            return null;
        }
        String prefix = EntryBatchReceiptService.editBusinessPrefix(kind, templateId);
        if (!business.equals(prefix) && !business.startsWith(prefix + "_")) {
            return null;
        }
        String fileId = this.text(file, "file_id");
        if (!fileId.isEmpty() && !String.valueOf(templateId).equals(fileId)) {
            return null;
        }
        return file;
    }

    private boolean formsStillDraft(String kind, Long actor, Set<String> keys) {
        for (String key : keys) {
            List found;
            if ("lab".equals(kind)) {
                Long id = this.positiveId(key);
                if (id == null) {
                    return false;
                }
                found = this.jdbc.queryForList("select status, operator_user_id from lab_entry_form where lab_task_list_id=?", new Object[]{id});
            } else if ("sampling".equals(kind)) {
                int split = key.indexOf(124);
                if (split <= 0) {
                    return false;
                }
                Long taskId = this.positiveId(key.substring(0, split));
                String sampleNo = key.substring(split + 1);
                if (taskId == null || sampleNo.isEmpty()) {
                    return false;
                }
                found = this.jdbc.queryForList("select status, operator_user_id from sampling_entry_form where task_list_id=? and sample_no=?", new Object[]{taskId, sampleNo});
            } else {
                return false;
            }
            if (found.size() == 1 && "DRAFT".equals(this.text((Map)found.get(0), "status")) && this.sameNumber(((Map)found.get(0)).get("operator_user_id"), actor)) continue;
            return false;
        }
        return true;
    }

    private Set<String> generationKeys(Map<String, Object> source) {
        Object values = source.get("generationRows");
        if (!(values instanceof List) || ((List)values).isEmpty()) {
            return null;
        }
        LinkedHashSet<String> keys = new LinkedHashSet<String>();
        for (Object value : (List)values) {
            if (!(value instanceof Map)) {
                return null;
            }
            String key = this.text((Map)value, "__rowKey");
            if (!key.isEmpty() && keys.add(key)) continue;
            return null;
        }
        return keys;
    }

    private List<Map<String, Object>> slimRows(Set<String> keys) {
        ArrayList<Map<String, Object>> rows = new ArrayList<Map<String, Object>>();
        for (String key : keys) {
            LinkedHashMap<String, Object> row = new LinkedHashMap<String, Object>();
            row.put("__rowKey", key);
            rows.add(row);
        }
        return rows;
    }

    private boolean sameNumber(Object value, Long expected) {
        return value instanceof Number && expected != null && ((Number)value).longValue() == expected.longValue();
    }

    private Long positiveId(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        try {
            long number = Long.parseLong(value);
            return number > 0L ? Long.valueOf(number) : null;
        }
        catch (NumberFormatException error) {
            return null;
        }
    }

    private Set<String> rows(Map<String, Object> source) {
        Object values = source.get("generationRows");
        LinkedHashSet<String> rows = new LinkedHashSet<String>();
        if (!(values instanceof List) || ((List)values).isEmpty()) {
            throw this.conflict("\u751f\u6210\u6765\u6e90\u7f3a\u5c11\u884c\u96c6\u5408");
        }
        for (Object value : (List)values) {
            String key = this.text((Map)value, "__rowKey");
            if (key.isEmpty() || !rows.add(key)) {
                throw this.conflict("\u751f\u6210\u6765\u6e90\u5b58\u5728\u7a7a\u884c\u952e\u6216\u91cd\u590d\u884c\u952e");
            }
            this.sourceFor(source, key);
        }
        return rows;
    }

    private void validRequest(String request) {
        if (request == null || request.trim().isEmpty() || request.length() > 128 || "null".equals(request)) {
            throw this.conflict("\u7f3a\u5c11\u6709\u6548\u7684\u539f\u4fdd\u5b58\u8bf7\u6c42\u6807\u8bc6");
        }
    }

    private long number(Object value) {
        if (!(value instanceof Number)) {
            throw this.conflict("\u6301\u4e45\u6765\u6e90\u7f3a\u5c11\u6709\u6548\u7248\u672c\u6216\u8eab\u4efd");
        }
        return ((Number)value).longValue();
    }

    private String text(Map<String, Object> map, String key) {
        Object value = map.get(key);
        return value == null ? "" : String.valueOf(value);
    }

    private String encode(Object value) {
        try {
            return this.json.writeValueAsString(value);
        }
        catch (Exception error) {
            throw this.conflict("\u6765\u6e90\u65e0\u6cd5\u5e8f\u5217\u5316");
        }
    }

    private Map<String, Object> decode(String value) {
        try {
            return (Map)this.json.readValue(value, (TypeReference)new TypeReference<LinkedHashMap<String, Object>>(){});
        }
        catch (Exception error) {
            throw this.conflict("\u6301\u4e45\u6765\u6e90\u65e0\u6cd5\u89e3\u6790");
        }
    }

    private ServiceException conflict(String message) {
        return new ServiceException(message, Integer.valueOf(409));
    }

    public static String sha(byte[] bytes) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256").digest(bytes);
            StringBuilder result = new StringBuilder();
            for (byte value : digest) {
                result.append(String.format("%02x", value));
            }
            return result.toString();
        }
        catch (Exception error) {
            throw new IllegalStateException(error);
        }
    }

    public static interface RowWriter {
        public Map<String, Object> write(String var1, Map<String, Object> var2);
    }
}
