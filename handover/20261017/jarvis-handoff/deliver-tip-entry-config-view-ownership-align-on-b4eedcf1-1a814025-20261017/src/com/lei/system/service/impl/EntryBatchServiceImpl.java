// ILLUSTRATIVE source (CFR decompile + knife). Ship class = ASM patch of ORIG 5b05565b; not javac of this file.
/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.fasterxml.jackson.core.type.TypeReference
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  com.lei.common.core.domain.entity.SysUser
 *  com.lei.common.exception.ServiceException
 *  com.lei.common.utils.DateUtils
 *  com.lei.common.utils.SecurityUtils
 *  com.lei.system.domain.LabEntryForm
 *  com.lei.system.domain.LabTaskList
 *  com.lei.system.domain.LabTaskPool
 *  com.lei.system.domain.SamplingEntryForm
 *  com.lei.system.domain.SysDataTemplate
 *  com.lei.system.domain.SysDataTemplateField
 *  com.lei.system.domain.SysOrder
 *  com.lei.system.domain.SysOrderProduct
 *  com.lei.system.domain.SysOrderTaskList
 *  com.lei.system.domain.SysOrderTaskListProduct
 *  com.lei.system.domain.SysOrderTaskPool
 *  com.lei.system.domain.SysTempFile
 *  com.lei.system.domain.TProduct
 *  com.lei.system.domain.mobile.MobileSamplingSample
 *  com.lei.system.domain.vo.OfficeFileConfigVo
 *  com.lei.system.mapper.LabEntryFormMapper
 *  com.lei.system.mapper.LabTaskListMapper
 *  com.lei.system.mapper.LabTaskPoolMapper
 *  com.lei.system.mapper.MobileSamplingSampleMapper
 *  com.lei.system.mapper.SamplingEntryFormMapper
 *  com.lei.system.mapper.SamplingEntryMapper
 *  com.lei.system.mapper.SysDataTemplateMapper
 *  com.lei.system.mapper.SysOrderMapper
 *  com.lei.system.mapper.SysOrderProductMapper
 *  com.lei.system.mapper.SysOrderTaskListMapper
 *  com.lei.system.mapper.SysOrderTaskPoolMapper
 *  com.lei.system.mapper.TProductMapper
 *  com.lei.system.qlt.EntryRegionValidator
 *  com.lei.system.service.ILabEntryFormService
 *  com.lei.system.service.ISamplingEntryFormService
 *  com.lei.system.service.ISysOrderTaskListProductService
 *  com.lei.system.service.ISysTaskListFileService
 *  com.lei.system.service.ISysTempFileService
 *  com.lei.system.service.OnlyOfficeJwtService
 *  com.lei.system.support.TaskSamplingPointResolver
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 *  org.springframework.transaction.annotation.Transactional
 *  org.springframework.transaction.support.TransactionSynchronizationManager
 *  org.springframework.util.StreamUtils
 */
package com.lei.system.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lei.common.core.domain.entity.SysUser;
import com.lei.common.exception.ServiceException;
import com.lei.common.utils.DateUtils;
import com.lei.common.utils.SecurityUtils;
import com.lei.system.domain.EntryBatchHeaderCell;
import com.lei.system.domain.EntryBatchRegion;
import com.lei.system.domain.LabEntryForm;
import com.lei.system.domain.LabTaskList;
import com.lei.system.domain.LabTaskPool;
import com.lei.system.domain.SamplingEntryForm;
import com.lei.system.domain.SysDataTemplate;
import com.lei.system.domain.SysDataTemplateField;
import com.lei.system.domain.SysOrder;
import com.lei.system.domain.SysOrderProduct;
import com.lei.system.domain.SysOrderTaskList;
import com.lei.system.domain.SysOrderTaskListProduct;
import com.lei.system.domain.SysOrderTaskPool;
import com.lei.system.domain.SysTempFile;
import com.lei.system.domain.TProduct;
import com.lei.system.domain.mobile.MobileSamplingSample;
import com.lei.system.domain.vo.OfficeFileConfigVo;
import com.lei.system.mapper.LabEntryFormMapper;
import com.lei.system.mapper.LabTaskListMapper;
import com.lei.system.mapper.LabTaskPoolMapper;
import com.lei.system.mapper.MobileSamplingSampleMapper;
import com.lei.system.mapper.SamplingEntryFormMapper;
import com.lei.system.mapper.SamplingEntryMapper;
import com.lei.system.mapper.SysDataTemplateMapper;
import com.lei.system.mapper.SysOrderMapper;
import com.lei.system.mapper.SysOrderProductMapper;
import com.lei.system.mapper.SysOrderTaskListMapper;
import com.lei.system.mapper.SysOrderTaskPoolMapper;
import com.lei.system.mapper.TProductMapper;
import com.lei.system.qlt.EntryRegionValidator;
import com.lei.system.service.IEntryBatchService;
import com.lei.system.service.ILabEntryFormService;
import com.lei.system.service.ISamplingEntryFormService;
import com.lei.system.service.ISysOrderTaskListProductService;
import com.lei.system.service.ISysTaskListFileService;
import com.lei.system.service.ISysTempFileService;
import com.lei.system.service.OnlyOfficeJwtService;
import com.lei.system.service.impl.EntryBatchReceiptService;
import com.lei.system.service.impl.EntryBatchWorkbook;
import com.lei.system.support.TaskSamplingPointResolver;
import java.io.InputStream;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.StreamUtils;

@Service
public class EntryBatchServiceImpl
implements IEntryBatchService {
    private static final Logger log = LoggerFactory.getLogger(EntryBatchServiceImpl.class);
    public static final String FILE_TYPE_PREFIX = "06";
    public static final String BIZ_SAMPLING = "sys_batch_entry_sampling";
    public static final String BIZ_LAB = "sys_batch_entry_lab";
    public static final String BIZ_LAB_READBACK = "sys_lab_entry_readback";
    public static final String BIZ_LAB_VIEW_CACHE = "sys_lab_entry_view_cache";
    private static final String KIND_SAMPLING = "sampling";
    private static final String KIND_LAB = "lab";
    @Autowired
    private SamplingEntryMapper samplingEntryMapper;
    @Autowired
    private MobileSamplingSampleMapper mobileSamplingSampleMapper;
    @Autowired
    private ISysOrderTaskListProductService orderTaskListProductService;
    @Autowired
    private SamplingEntryFormMapper samplingEntryFormMapper;
    @Autowired
    private LabEntryFormMapper labEntryFormMapper;
    @Autowired
    private SysOrderTaskListMapper sysOrderTaskListMapper;
    @Autowired
    private SysOrderTaskPoolMapper sysOrderTaskPoolMapper;
    @Autowired
    private LabTaskListMapper labTaskListMapper;
    @Autowired
    private LabTaskPoolMapper labTaskPoolMapper;
    @Autowired
    private SysOrderMapper sysOrderMapper;
    @Autowired
    private SysDataTemplateMapper templateMapper;
    @Autowired
    private SysOrderProductMapper sysOrderProductMapper;
    @Autowired
    private TProductMapper tProductMapper;
    @Autowired
    private ISysTempFileService sysTempFileService;
    @Autowired
    private ISamplingEntryFormService samplingEntryFormService;
    @Autowired
    private ILabEntryFormService labEntryFormService;
    @Autowired
    private OnlyOfficeJwtService onlyOfficeJwtService;
    @Autowired
    private EntryBatchReceiptService batchReceipts;
    @Autowired
    private ISysTaskListFileService taskListFileService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Map<String, Object> preview(String kind, List<Map<String, Object>> items, Long operatorUserId) {
        String normalizedKind = this.normalizeKind(kind);
        if (items == null || items.isEmpty()) {
            throw new ServiceException("\u8bf7\u5148\u52fe\u9009\u9700\u8981\u6279\u91cf\u5f55\u5165\u7684\u8bb0\u5f55");
        }
        LinkedHashMap<Long, Map<String, Object>> groups = new LinkedHashMap<Long, Map<String, Object>>();
        LinkedHashMap<Long, EntryBatchRegion> regionCache = new LinkedHashMap<Long, EntryBatchRegion>();
        ArrayList<Map<String, Object>> problems = new ArrayList<Map<String, Object>>();
        for (Map<String, Object> item : items) {
            try {
                Resolved resolved = this.resolve(normalizedKind, item, operatorUserId);
                EntryBatchRegion region = this.regionOf(resolved.templateId, regionCache);
                this.assertRegionMatchesTemplate(resolved.templateId, region);
                this.applySystemValues(normalizedKind, resolved.row, region, resolved.scopeId);
                Map<String, Object> group = (Map<String, Object>)groups.get(resolved.templateId);
                if (group == null) {
                    group = this.buildGroup(resolved.templateId);
                    groups.put(resolved.templateId, group);
                }
                List rows = (List)group.get("rows");
                rows.add(resolved.row);
            }
            catch (ServiceException error) {
                problems.add(this.problem(item, error.getMessage()));
            }
        }
        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object>();
        result.put("kind", normalizedKind);
        result.put("groups", new ArrayList(groups.values()));
        result.put("problems", problems);
        return result;
    }

    @Override
    public Map<String, Object> resolveDraft(String kind, Long templateId, List<Map<String, Object>> items, Long operatorUserId) {
        String normalizedKind = this.normalizeKind(kind);
        if (operatorUserId == null || operatorUserId <= 0L) {
            throw new ServiceException("\u7f3a\u5c11\u5b9e\u9645\u767b\u5f55\u8eab\u4efd", Integer.valueOf(403));
        }
        if (templateId == null || templateId <= 0L) {
            throw new ServiceException("\u7f3a\u5c11\u6a21\u677fID");
        }
        return this.batchReceipts.findActiveDraft(operatorUserId, normalizedKind, templateId, EntryBatchServiceImpl.draftRowKeys(normalizedKind, items));
    }

    @Override
    @Transactional(rollbackFor={Exception.class})
    public Map<String, Object> createDocument(String kind, Long templateId, List<Map<String, Object>> items, Long operatorUserId) {
        return this.createDocument(kind, templateId, items, operatorUserId, false);
    }

    @Override
    @Transactional(rollbackFor={Exception.class})
    public Map<String, Object> createDocument(String kind, Long templateId, List<Map<String, Object>> items, Long operatorUserId, boolean viewOnly) {
        return this.createDocumentInternal(kind, templateId, items, operatorUserId, viewOnly, false);
    }

    @Override
    @Transactional(rollbackFor={Exception.class})
    public Map<String, Object> createFrozenReadback(Long templateId, Map<String, Object> item, Long operatorUserId) {
        if (item == null || this.longValue(item, "expectedFormId") == null || this.longValue(item, "expectedFormVersion") == null) {
            throw new ServiceException("\u8865\u507f\u56de\u8bfb\u7f3a\u5c11\u5b8c\u6210\u8868\u5355\u8eab\u4efd\u4e0e\u7248\u672c");
        }
        return this.createDocumentInternal(KIND_LAB, templateId, Collections.singletonList(item), operatorUserId, true, true);
    }

    private Map<String, Object> createDocumentInternal(String kind, Long templateId, List<Map<String, Object>> items, Long operatorUserId, boolean viewOnly, boolean frozenReadback) {
        int affected;
        SysTempFile existing;
        SysDataTemplate identity;
        String normalizedKind = this.normalizeKind(kind);
        if (templateId == null || templateId <= 0L) {
            throw new ServiceException("\u7f3a\u5c11\u6a21\u677fID");
        }
        if (items == null || items.isEmpty()) {
            throw new ServiceException("\u8bf7\u5148\u52fe\u9009\u9700\u8981\u6279\u91cf\u5f55\u5165\u7684\u8bb0\u5f55");
        }
        SysDataTemplate template = this.templateMapper.selectWithContentById(templateId);
        if (template == null || template.getFileContent() == null || template.getFileContent().length == 0) {
            throw new ServiceException("\u6a21\u677f\u6587\u4ef6\u4e0d\u5b58\u5728\u6216\u5df2\u88ab\u6e05\u7406\uff0c\u8bf7\u91cd\u65b0\u4e0a\u4f20\u6a21\u677f");
        }
        EntryBatchRegion region = EntryBatchRegion.fromManifest(template.getLayoutManifest(), this.objectMapper);
        if (region == null || region.getColumns() == null || region.getColumns().isEmpty()) {
            throw new ServiceException("\u6a21\u677f\u672a\u914d\u7f6e\u5f55\u5165\u533a\uff08entryRegion\uff09\uff0c\u8bf7\u5148\u5728\u6a21\u677f\u7ba1\u7406\u4e2d\u914d\u7f6e");
        }
        this.assertRegionMatchesTemplate(templateId, region);
        ArrayList<Map<String, Object>> rows = new ArrayList<Map<String, Object>>();
        ArrayList<Map<String, Object>> sources = new ArrayList<Map<String, Object>>();
        SysDataTemplate sysDataTemplate = identity = viewOnly ? null : this.templateMapper.selectById(templateId);
        if (!(viewOnly || identity != null && identity.getTemplateVersion() != null && this.sha256(template.getFileContent()).equals(identity.getFileSha256()))) {
            throw new ServiceException("\u6a21\u677f\u7248\u672c\u6216\u5b9e\u9645\u6587\u4ef6\u6458\u8981\u4e0d\u5b8c\u6574\uff0c\u8bf7\u5148\u6838\u5bf9\u6a21\u677f", Integer.valueOf(409));
        }
        Long foreignKey = null;
        for (Map<String, Object> item : items) {
            Object resolved;
            Object object = resolved = viewOnly ? this.resolveForView(normalizedKind, item, templateId, operatorUserId) : this.resolve(normalizedKind, item, operatorUserId);
            if (!((Resolved)resolved).templateId.equals(templateId)) {
                throw new ServiceException("\u540c\u4e00\u6b21\u751f\u6210\u5fc5\u987b\u5c5e\u4e8e\u540c\u4e00\u6a21\u677f\uff0c\u8bf7\u5237\u65b0\u540e\u91cd\u8bd5");
            }
            if (viewOnly) {
                this.applySystemValues(normalizedKind, ((Resolved)resolved).row, region, ((Resolved)resolved).scopeId);
            }
            if (viewOnly) {
                if (this.longValue(item, "expectedFormId") != null && !this.sha256(template.getFileContent()).equals(((Resolved)resolved).templateSha)) {
                    throw new ServiceException("\u56de\u8bfb\u6a21\u677f\u5b57\u8282\u4e0e\u5df2\u5ba1\u6838\u8868\u5355\u5feb\u7167\u4e0d\u4e00\u81f4");
                }
                this.prefillValues(((Resolved)resolved).values, ((Resolved)resolved).row, region);
            } else {
                Map frozenValues;
                if (KIND_SAMPLING.equals(normalizedKind)) {
                    this.samplingEntryFormService.createOrGet(((Resolved)resolved).scopeId, this.text(((Resolved)resolved).row.get("__sampleNo")), templateId, operatorUserId);
                }
                Map<String, Object> frozen = this.batchReceipts.freezeForm(normalizedKind, this.text(((Resolved)resolved).row.get("__rowKey")), operatorUserId);
                if (!(String.valueOf(templateId).equals(String.valueOf(frozen.get("templateId"))) && identity.getTemplateVersion().equals(frozen.get("templateVersion")) && this.sha256(template.getFileContent()).equals(frozen.get("templateFileSha256")))) {
                    throw new ServiceException("\u5f55\u5165\u8868\u6a21\u677f\u5feb\u7167\u4e0e\u751f\u6210\u6a21\u677f\u4e0d\u4e00\u81f4\uff0c\u8bf7\u6838\u5bf9\u540e\u91cd\u65b0\u751f\u6210", Integer.valueOf(409));
                }
                sources.add(frozen);
                try {
                    frozenValues = (Map)this.objectMapper.readValue(this.text(frozen.get("valuesJson")), (TypeReference)new TypeReference<LinkedHashMap<String, Object>>(){});
                    if (frozenValues == null) {
                        throw new IllegalArgumentException("null values");
                    }
                }
                catch (Exception error) {
                    throw new ServiceException("\u51bb\u7ed3\u8868\u5355\u503c\u65e0\u6cd5\u6838\u5bf9\uff0c\u7981\u6b62\u751f\u6210\u6279\u91cf\u5de5\u4f5c\u7c3f", Integer.valueOf(409));
                }
                ((Resolved)resolved).row.putAll(this.systemValues(normalizedKind, ((Resolved)resolved).scopeId, this.text(((Resolved)resolved).row.get("__sampleNo")), this.text(((Resolved)resolved).row.get("__itemName")), region, frozenValues));
                this.prefillValues(frozenValues, ((Resolved)resolved).row, region);
            }
            if (foreignKey == null) {
                foreignKey = ((Resolved)resolved).scopeId;
            }
            rows.add(((Resolved)resolved).row);
        }
        if (!viewOnly) {
            SysDataTemplate locked = this.templateMapper.selectByIdForUpdate(templateId);
            SysDataTemplate lockedContent = this.templateMapper.selectWithContentById(templateId);
            if (!(locked != null && lockedContent != null && lockedContent.getFileContent() != null && identity.getTemplateVersion().equals(locked.getTemplateVersion()) && this.sha256(template.getFileContent()).equals(locked.getFileSha256()) && Objects.equals(template.getLayoutManifest(), locked.getLayoutManifest()) && this.sha256(template.getFileContent()).equals(this.sha256(lockedContent.getFileContent())) && Objects.equals(template.getLayoutManifest(), lockedContent.getLayoutManifest()))) {
                throw new ServiceException("\u751f\u6210\u671f\u95f4\u6a21\u677f\u5df2\u53d8\u5316\uff0c\u8bf7\u91cd\u65b0\u6838\u5bf9", Integer.valueOf(409));
            }
        }
        LinkedHashSet<String> computedFields = new LinkedHashSet<String>();
        List templateFields = this.templateMapper.selectFieldsByTemplateId(templateId);
        if (templateFields != null) {
            for (SysDataTemplateField field : templateFields) {
                if (field.getFormulaText() == null || field.getFormulaText().trim().isEmpty()) continue;
                computedFields.add(field.getFieldKey());
            }
        }
        List<EntryBatchHeaderCell> headerCells = EntryBatchHeaderCell.fromManifest(template.getLayoutManifest(), this.objectMapper);
        ArrayList<String> unresolvedHeaderCells = new ArrayList<String>();
        Map<String, String> headerValues = headerCells.isEmpty() ? Collections.emptyMap() : this.resolveHeaderValues(normalizedKind, foreignKey, headerCells, unresolvedHeaderCells);
        byte[] content = EntryBatchWorkbook.generate(template.getFileContent(), region, rows, computedFields, headerCells, headerValues, viewOnly && !frozenReadback);
        String fileKey = UUID.randomUUID().toString().replace("-", "");
        String businessTableName = viewOnly ? (frozenReadback ? BIZ_LAB_READBACK : BIZ_LAB_VIEW_CACHE) + "_" + templateId : this.businessTable(normalizedKind, templateId) + "_" + fileKey;
        SysTempFile sysTempFile = existing = viewOnly ? this.sysTempFileService.selectByForeignKeyAndFileType(foreignKey, FILE_TYPE_PREFIX, businessTableName) : null;
        if (frozenReadback && existing != null) {
            throw new ServiceException("\u8865\u507f\u51bb\u7ed3\u6587\u4ef6\u5df2\u5b58\u5728\uff0c\u7981\u6b62\u8986\u76d6\uff1b\u8bf7\u56de\u8bfb\u539f\u6536\u636e\u6838\u5bf9");
        }
        SysTempFile tempFile = existing == null ? new SysTempFile() : existing;
        tempFile.setFileKey(fileKey);
        tempFile.setForeignKey(foreignKey);
        tempFile.setFileType(FILE_TYPE_PREFIX);
        tempFile.setFileId(String.valueOf(templateId));
        tempFile.setBusinessTableName(businessTableName);
        tempFile.setOfficeFileType("xlsx");
        tempFile.setFilename(EntryBatchServiceImpl.documentFilename(viewOnly, template, templateId, rows.size()));
        tempFile.setFileDate(content);
        tempFile.setDelFlag("0");
        tempFile.setCreateUser(operatorUserId);
        tempFile.setCreateTime(DateUtils.getNowDate());
        tempFile.setUpdateUser(operatorUserId);
        tempFile.setUpdateTime(DateUtils.getNowDate());
        int n = affected = existing == null ? this.sysTempFileService.insertSysTempFile(tempFile) : this.sysTempFileService.updateSysTempFile(tempFile);
        if (affected != 1) {
            throw new ServiceException("\u767b\u8bb0\u6279\u91cf\u5f55\u5165\u5de5\u4f5c\u7c3f\u5931\u8d25");
        }
        LinkedHashMap<String, Object> result = new LinkedHashMap<String, Object>();
        result.put("fileKey", fileKey);
        result.put("templateId", templateId);
        result.put("rowCount", rows.size());
        result.put("fileType", tempFile.getFileType());
        if (!viewOnly) {
            LinkedHashMap<String, Object> source = new LinkedHashMap<String, Object>();
            source.put("schemaVersion", 1);
            source.put("fileKey", fileKey);
            source.put("createUser", operatorUserId);
            source.put("kind", normalizedKind);
            source.put("templateId", templateId);
            source.put("templateVersion", identity.getTemplateVersion());
            source.put("templateFileSha256", this.sha256(template.getFileContent()));
            source.put("templateFieldsSha256", this.jsonSha(templateFields));
            source.put("generationContentSha256", this.sha256(content));
            source.put("sources", sources);
            source.put("generationRows", rows);
            source.put("generationHeaderValues", headerValues);
            result.put("sourceReceiptSha256", this.batchReceipts.registerGeneration(fileKey, operatorUserId, source, template.getLayoutManifest(), content));
        }
        if (!unresolvedHeaderCells.isEmpty()) {
            result.put("unresolvedHeaderCells", unresolvedHeaderCells);
        }
        return result;
    }

    static String documentFilename(boolean viewOnly, SysDataTemplate template, Long templateId, int rowCount) {
        String prefix = viewOnly ? "\u5b9e\u9a8c\u53ea\u8bfb\u56de\u8bfb-" : "\u6279\u91cf\u5f55\u5165-";
        return prefix + EntryBatchServiceImpl.templateLabel(template, templateId) + "-" + rowCount + "\u884c.xlsx";
    }

    private static String templateLabel(SysDataTemplate template, Long templateId) {
        Long id;
        String name = EntryBatchServiceImpl.usableLabel(template == null ? null : template.getTemplateName());
        if (name != null) {
            return name;
        }
        String code = EntryBatchServiceImpl.usableLabel(template == null ? null : template.getTemplateCode());
        if (code != null) {
            return code;
        }
        Long l = templateId != null ? templateId : (id = template == null ? null : template.getId());
        if (id != null) {
            return String.valueOf(id);
        }
        return "template";
    }

    private static String usableLabel(String raw) {
        if (raw == null) {
            return null;
        }
        String trimmed = raw.trim();
        if (trimmed.isEmpty() || "null".equalsIgnoreCase(trimmed)) {
            return null;
        }
        return trimmed;
    }

    private Resolved resolveForView(String kind, Map<String, Object> item, Long requestedTemplateId, Long operatorUserId) {
        Long existingTemplateId;
        if (!KIND_LAB.equals(kind)) {
            throw new ServiceException("\u53ea\u8bfb\u56de\u8bfb\u76ee\u524d\u4ec5\u652f\u6301\u5b9e\u9a8c\u6570\u636e");
        }
        Long labTaskListId = this.longValue(item, "labTaskListId", "lab_task_list_id", "labTestItemId", "lab_test_item_id");
        if (labTaskListId == null || labTaskListId <= 0L) {
            throw new ServiceException("\u7f3a\u5c11\u5b9e\u9a8c\u4efb\u52a1\u5217\u8868ID\uff08labTaskListId\uff09");
        }
        Map existing = this.labEntryFormService.getByTask(labTaskListId, operatorUserId);
        Long l = existingTemplateId = existing == null ? null : this.numberToLong(existing.get("template_id"));
        if (existingTemplateId == null || !existingTemplateId.equals(requestedTemplateId)) {
            throw new ServiceException("\u5f55\u5165\u8868\u6a21\u677f\u5feb\u7167\u4e0e\u5f53\u524d\u56de\u8bfb\u6a21\u677f\u4e0d\u4e00\u81f4");
        }
        Long expectedFormId = this.longValue(item, "expectedFormId");
        Long expectedVersion = this.longValue(item, "expectedFormVersion");
        if (!(expectedFormId == null || expectedFormId.equals(this.numberToLong(existing.get("entry_form_id"))) && expectedVersion != null && expectedVersion.equals(this.numberToLong(existing.get("version"))) && "REVIEWED".equals(existing.get("status")))) {
            throw new ServiceException("\u5b8c\u6210\u8868\u5355\u8eab\u4efd\u6216\u5ba1\u6838\u7248\u672c\u5df2\u53d8\u5316\uff0c\u62d2\u7edd\u751f\u6210\u56de\u8bfb");
        }
        Resolved resolved = new Resolved();
        Object values = existing.get("values");
        if (!(values instanceof Map)) {
            throw new ServiceException("\u56de\u8bfb\u8868\u5355\u7f3a\u5c11\u53ef\u6838\u5bf9\u7684\u539f\u59cb\u503c");
        }
        resolved.values = (Map)values;
        resolved.templateSha = this.text(existing.get("template_file_sha256"));
        resolved.templateId = existingTemplateId;
        resolved.scopeId = labTaskListId;
        LinkedHashMap<String, String> row = new LinkedHashMap<String, String>();
        row.put("__rowKey", String.valueOf(labTaskListId));
        row.put("__sampleNo", "");
        row.put("__itemName", this.text(existing.get("template_name")));
        resolved.row = row;
        return resolved;
    }

    @Override
    public Map<String, Object> commit(String fileKey, Long operatorUserId) {
        return this.commitInternal(fileKey, null, operatorUserId);
    }

    @Override
    public Map<String, Object> commit(String fileKey, String saveRequestId, Long operatorUserId) {
        return this.commitInternal(fileKey, saveRequestId, operatorUserId);
    }

    private Map<String, Object> commitInternal(String fileKey, String saveRequestId, Long operatorUserId) {
        Map<String, Object> source = this.batchReceipts.source(fileKey, operatorUserId);
        String kind = this.text(source.get("kind"));
        Long templateId = this.numberToLong(source.get("templateId"));
        EntryBatchRegion region = EntryBatchRegion.fromManifest(this.batchReceipts.manifest(fileKey, operatorUserId), this.objectMapper);
        if (region == null) {
            throw new ServiceException("\u51bb\u7ed3\u5f55\u5165\u533a\u57df\u4e0d\u5b58\u5728", Integer.valueOf(409));
        }
        LinkedHashSet<String> expectedKeys = new LinkedHashSet<String>();
        for (Map row2 : (List)source.get("generationRows")) {
            expectedKeys.add(this.text(row2.get("__rowKey")));
        }
        List<Map<String, Object>> parsed = EntryBatchWorkbook.parse(this.batchReceipts.savedBytes(fileKey, saveRequestId, operatorUserId), region, expectedKeys);
        LinkedHashSet<String> parsedKeys = new LinkedHashSet<String>();
        for (Map<String, Object> row3 : parsed) {
            if (parsedKeys.add(this.text(row3.get("__rowKey")))) continue;
            throw new ServiceException("\u5de5\u4f5c\u7c3f\u51fa\u73b0\u91cd\u590d\u884c\u952e", Integer.valueOf(409));
        }
        if (!expectedKeys.equals(parsedKeys)) {
            throw new ServiceException("\u5de5\u4f5c\u7c3f\u884c\u96c6\u5408\u4e0e\u539f\u751f\u6210\u6765\u6e90\u4e0d\u4e00\u81f4", Integer.valueOf(409));
        }
        return this.batchReceipts.commit(fileKey, saveRequestId, operatorUserId, parsed, (rowKey, row) -> {
            LinkedHashMap<String, Object> item = new LinkedHashMap<String, Object>();
            item.put("__rowKey", rowKey);
            Resolved resolved = this.resolve(kind, item, operatorUserId);
            if (!templateId.equals(resolved.templateId)) {
                throw new ServiceException("\u5b9e\u9645\u7ed1\u5b9a\u6a21\u677f\u5df2\u53d8\u5316", Integer.valueOf(409));
            }
            SysDataTemplate current = this.templateMapper.selectByIdForUpdate(templateId);
            SysDataTemplate content = this.templateMapper.selectWithContentById(templateId);
            if (!(current != null && content != null && content.getFileContent() != null && this.text(source.get("templateVersion")).equals(current.getTemplateVersion()) && this.text(source.get("templateFileSha256")).equals(this.sha256(content.getFileContent())) && this.batchReceipts.manifest(fileKey, operatorUserId).equals(content.getLayoutManifest()) && this.text(source.get("templateFieldsSha256")).equals(this.jsonSha(this.templateMapper.selectFieldsByTemplateId(templateId))))) {
                throw new ServiceException("\u6a21\u677f\u5185\u5bb9\u6216\u5b57\u6bb5\u5b9a\u4e49\u5df2\u53d8\u5316\uff0c\u8bf7\u91cd\u65b0\u751f\u6210\u6838\u5bf9", Integer.valueOf(409));
            }
            LinkedHashMap<String, Object> rowValues = new LinkedHashMap<String, Object>();
            HashSet<String> computed = new HashSet<String>();
            for (SysDataTemplateField sysDataTemplateField : this.templateMapper.selectFieldsByTemplateId(templateId)) {
                if (sysDataTemplateField.getFormulaText() == null || sysDataTemplateField.getFormulaText().trim().isEmpty()) continue;
                computed.add(sysDataTemplateField.getFieldKey());
            }
            for (EntryBatchRegion.Column column : region.getColumns()) {
                if (column.reserved() || computed.contains(column.getFieldKey())) continue;
                rowValues.put(column.getFieldKey(), this.text(row.get(column.getFieldKey())));
            }
            Map generated = null;
            for (Map candidate : (List)source.get("generationRows")) {
                if (!rowKey.equals(this.text(candidate.get("__rowKey")))) continue;
                generated = candidate;
            }
            if (generated == null) {
                throw new ServiceException("\u539f\u751f\u6210\u884c\u4e0d\u5b58\u5728", Integer.valueOf(409));
            }
            Map<String, String> map = this.systemValues(kind, this.scopeOf(kind, rowKey), this.text(generated.get("__sampleNo")), this.text(generated.get("__itemName")), region);
            ArrayList<String> systemColumns = new ArrayList<String>();
            for (EntryBatchRegion.Column column : region.getColumns()) {
                boolean generationConstant;
                if (!column.systemFilled() || column.reserved() || computed.contains(column.getFieldKey())) continue;
                String field = column.getFieldKey();
                String sourceKey = column.resolvedSourceKey();
                String frozenValue = this.text(generated.get(field));
                boolean bl = generationConstant = "today".equals(sourceKey) || "row.sampleNo".equals(sourceKey) || "row.itemName".equals(sourceKey);
                if (!generationConstant && !frozenValue.equals(this.text(map.get(field)))) {
                    throw new ServiceException("\u7cfb\u7edf\u6765\u6e90\u5b57\u6bb5\u5df2\u53d8\u5316\uff0c\u8bf7\u91cd\u65b0\u751f\u6210\u6838\u5bf9", Integer.valueOf(409));
                }
                rowValues.put(field, frozenValue);
                systemColumns.add(field);
            }
            Map<String, Object> written = this.writeRow(kind, rowKey, rowValues, operatorUserId, templateId);
            if (!systemColumns.isEmpty()) {
                written.put("systemFilled", systemColumns);
            }
            return written;
        });
    }

    @Override
    public Map<String, Object> source(String fileKey, Long actor) {
        return this.batchReceipts.source(fileKey, actor);
    }

    @Override
    public Map<String, Object> originalSave(String fileKey, String requestId, Long actor) {
        return this.batchReceipts.originalSave(fileKey, requestId, actor);
    }

    @Override
    public Map<String, Object> originalCommit(String fileKey, String requestId, Long actor) {
        Map<String, Object> result = this.batchReceipts.originalCommit(fileKey, requestId, actor);
        if (Boolean.TRUE.equals(result.get("canResume"))) {
            Map<String, Object> source = this.batchReceipts.source(fileKey, actor);
            try {
                for (Map row : (List)result.get("rows")) {
                    if (!"PENDING".equals(row.get("status"))) continue;
                    LinkedHashMap<String, Object> item = new LinkedHashMap<String, Object>();
                    item.put("__rowKey", row.get("rowKey"));
                    this.resolve(this.text(source.get("kind")), item, actor);
                }
            }
            catch (ServiceException error) {
                result.put("canResume", false);
                result.put("resumeBlockedReason", error.getMessage());
            }
        }
        return result;
    }

    private String jsonSha(Object value) {
        try {
            return this.sha256(this.objectMapper.writeValueAsBytes(value));
        }
        catch (Exception error) {
            throw new ServiceException("\u65e0\u6cd5\u6838\u5bf9\u5b57\u6bb5\u5b9a\u4e49\u6458\u8981", Integer.valueOf(409));
        }
    }

    @Override
    public Map<String, Object> forceSave(String fileKey, String documentKey, String saveRequestId, Long operatorUserId) {
        if (fileKey == null || fileKey.trim().isEmpty()) {
            throw new ServiceException("\u7f3a\u5c11\u6587\u6863\u6807\u8bc6 fileKey");
        }
        SysTempFile tempFile = this.sysTempFileService.selectByFileKey(fileKey.trim());
        if (tempFile == null || !Objects.equals(tempFile.getCreateUser(), operatorUserId)) {
            throw new ServiceException("\u6279\u91cf\u5f55\u5165\u5de5\u4f5c\u7c3f\u4e0d\u5b58\u5728\u6216\u4e0d\u5c5e\u4e8e\u5f53\u524d\u5b9e\u9a8c\u5458");
        }
        if (EntryBatchServiceImpl.isFrozenReadback(tempFile)) {
            throw new ServiceException("\u8865\u507f\u51bb\u7ed3\u56de\u8bfb\u4e0d\u53ef\u5f3a\u5236\u4fdd\u5b58");
        }
        if (documentKey == null || documentKey.trim().isEmpty() || saveRequestId == null || saveRequestId.trim().isEmpty()) {
            throw new ServiceException("\u7f3a\u5c11\u5f53\u524d\u7f16\u8f91\u4f1a\u8bdd documentKey \u6216\u4fdd\u5b58\u8bf7\u6c42\u6807\u8bc6");
        }
        if (!this.batchReceipts.beginSave(fileKey.trim(), documentKey.trim(), saveRequestId.trim(), operatorUserId)) {
            return this.batchReceipts.status(fileKey.trim(), saveRequestId.trim(), operatorUserId);
        }
        LinkedHashMap<String, String> command = new LinkedHashMap<String, String>();
        command.put("c", "forcesave");
        command.put("key", documentKey.trim());
        command.put("userdata", saveRequestId.trim());
        LinkedHashMap<String, String> body = new LinkedHashMap<String, String>(command);
        body.put("token", this.onlyOfficeJwtService.signCommandRequest(command));
        String baseUrl = this.taskListFileService.resolveDocumentServerUrl();
        HttpURLConnection connection = null;
        try {
            String response;
            String endpoint = this.trimTrailingSlash(baseUrl) + "/command?shardkey=" + URLEncoder.encode(documentKey.trim(), StandardCharsets.UTF_8.name());
            connection = (HttpURLConnection)new URL(endpoint).openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setConnectTimeout(3000);
            connection.setReadTimeout(10000);
            connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
            byte[] payload = this.objectMapper.writeValueAsBytes(body);
            connection.getOutputStream().write(payload);
            int status = connection.getResponseCode();
            InputStream stream = status >= 400 ? connection.getErrorStream() : connection.getInputStream();
            String string = response = stream == null ? "" : new String(StreamUtils.copyToByteArray((InputStream)stream), StandardCharsets.UTF_8);
            if (status < 200 || status >= 300) {
                throw new ServiceException("OnlyOffice\u5f3a\u5236\u4fdd\u5b58\u8bf7\u6c42\u5931\u8d25 HTTP " + status);
            }
            Map result = (Map)this.objectMapper.readValue(response, Map.class);
            Object error = result.get("error");
            if (error != null && !"0".equals(String.valueOf(error))) {
                throw new ServiceException("OnlyOffice\u5f3a\u5236\u4fdd\u5b58\u88ab\u62d2\u7edd error=" + error);
            }
            LinkedHashMap<String, Object> accepted = new LinkedHashMap<String, Object>();
            accepted.put("fileKey", fileKey.trim());
            accepted.put("documentKey", documentKey.trim());
            accepted.put("saveRequestId", saveRequestId.trim());
            accepted.put("commandStatus", "ACCEPTED");
            LinkedHashMap<String, Object> linkedHashMap = accepted;
            return linkedHashMap;
        }
        catch (ServiceException error) {
            throw error;
        }
        catch (Exception error) {
            throw new ServiceException("OnlyOffice\u5f3a\u5236\u4fdd\u5b58\u8c03\u7528\u5931\u8d25\uff1a" + error.getMessage());
        }
        finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    @Override
    public Map<String, Object> forceSaveStatus(String fileKey, String saveRequestId, Long operatorUserId) {
        return this.batchReceipts.status(fileKey, saveRequestId, operatorUserId);
    }

    @Override
    public OfficeFileConfigVo config(String fileKey, String mode) {
        boolean batchFile;
        if (!"edit".equals(mode) && !"view".equals(mode)) {
            throw new ServiceException("\u6279\u91cf\u5f55\u5165\u6587\u4ef6\u4ec5\u652f\u6301\u7f16\u8f91\u6216\u67e5\u770b\u6a21\u5f0f", Integer.valueOf(400));
        }
        Long operatorUserId = SecurityUtils.getUserId();
        SysTempFile tempFile = this.sysTempFileService.selectByFileKey(fileKey);
        if (tempFile == null || operatorUserId == null || operatorUserId <= 0L
                || ("edit".equals(mode) && !Objects.equals(tempFile.getCreateUser(), operatorUserId))) {
            throw new ServiceException("批量录入工作簿不存在或不属于当前账号", Integer.valueOf(403));
        }
        Long templateId = this.parseTemplateId(tempFile.getFileId());
        String business = tempFile.getBusinessTableName();
        boolean bl = batchFile = templateId != null && templateId > 0L && FILE_TYPE_PREFIX.equals(tempFile.getFileType()) && (("sys_batch_entry_sampling_" + templateId).equals(business) || ("sys_batch_entry_lab_" + templateId).equals(business) || ("sys_batch_entry_sampling_" + templateId + "_" + fileKey).equals(business) || ("sys_batch_entry_lab_" + templateId + "_" + fileKey).equals(business) || ("sys_lab_entry_readback_" + templateId).equals(business) || ("sys_lab_entry_view_cache_" + templateId).equals(business));
        if (!batchFile) {
            throw new ServiceException("\u8be5\u6587\u4ef6\u4e0d\u662f\u6709\u6548\u7684\u6279\u91cf\u5f55\u5165\u6216\u56de\u8bfb\u5de5\u4f5c\u7c3f", Integer.valueOf(403));
        }
        if (EntryBatchServiceImpl.isFrozenReadback(tempFile) && !"view".equals(mode)) {
            throw new ServiceException("\u8865\u507f\u51bb\u7ed3\u56de\u8bfb\u4ec5\u5141\u8bb8\u67e5\u770b\uff0c\u4e0d\u80fd\u6253\u5f00\u7f16\u8f91\u4f1a\u8bdd");
        }
        String baseUrl = this.taskListFileService.resolveOnlyOfficeInternalBaseUrl();
        String token = this.sysTempFileService.issueFileAccessToken(fileKey, "tempFile");
        String documentKey = this.onlyOfficeJwtService.buildVersionedDocumentKey(fileKey, mode, tempFile.getFileDate());
        if ("edit".equals(mode) && EntryBatchServiceImpl.isEditableBatch(tempFile) && this.batchReceipts.exists(fileKey)) {
            this.batchReceipts.registerSession(fileKey, operatorUserId, documentKey, this.sha256(tempFile.getFileDate()));
        }
        OfficeFileConfigVo config = new OfficeFileConfigVo();
        config.setFileType("xlsx");
        config.setFileKey(fileKey);
        config.setFilename(tempFile.getFilename());
        config.setFileUrl(baseUrl + "/system/temp/file/getFile/" + fileKey + (token == null ? "" : "?token=" + token));
        config.setDocumentServerUrl(this.taskListFileService.resolveDocumentServerUrl());
        if ("edit".equals(mode)) {
            config.setCallbackUrl(this.sysTempFileService.buildOnlyOfficeCallbackUrl(baseUrl, fileKey, documentKey));
        }
        SysUser user = SecurityUtils.getLoginUser().getUser();
        this.onlyOfficeJwtService.attachSignedDocumentConfig(config, mode, user, documentKey);
        return config;
    }

    static boolean isEditableBatch(SysTempFile file) {
        return file != null && FILE_TYPE_PREFIX.equals(file.getFileType()) && file.getBusinessTableName() != null && (file.getBusinessTableName().startsWith("sys_batch_entry_lab_") || file.getBusinessTableName().startsWith("sys_batch_entry_sampling_"));
    }

    static boolean isFrozenReadback(SysTempFile file) {
        return file != null && file.getBusinessTableName() != null && file.getBusinessTableName().startsWith("sys_lab_entry_readback_");
    }

    private Map<String, Object> writeRow(String kind, String rowKey, Map<String, Object> values, Long operatorUserId, Long templateId) {
        if (rowKey == null || rowKey.isEmpty()) {
            throw new ServiceException("\u884c\u952e\u4e3a\u7a7a\uff0c\u5df2\u8df3\u8fc7\uff08\u8bf7\u52ff\u5220\u9664\u7cfb\u7edf\u9884\u586b\u5217\uff09");
        }
        if (values.isEmpty()) {
            throw new ServiceException("\u8be5\u884c\u6ca1\u6709\u586b\u5199\u4efb\u4f55\u6570\u636e");
        }
        LinkedHashMap<String, Object> written = new LinkedHashMap<String, Object>();
        if (KIND_SAMPLING.equals(kind)) {
            int split = rowKey.indexOf(124);
            if (split <= 0) {
                throw new ServiceException("\u884c\u952e\u683c\u5f0f\u975e\u6cd5\uff08\u5e94\u4e3a taskListId|\u6837\u54c1\u7f16\u53f7\uff09\uff0c\u5df2\u62d2\u7edd\u8be5\u884c");
            }
            Long taskListId = this.parseLong(rowKey.substring(0, split), "\u884c\u952e\u4e2d\u7684\u4efb\u52a1\u5217\u8868ID");
            String sampleNo = rowKey.substring(split + 1);
            this.samplingEntryFormService.createOrGet(taskListId, sampleNo, templateId, operatorUserId);
            this.samplingEntryFormService.saveDraft(taskListId, sampleNo, values, operatorUserId);
            Map<String, Object> persisted = this.existingValues(KIND_SAMPLING, taskListId, sampleNo);
            for (Map.Entry<String, Object> entry : values.entrySet()) {
                if (this.text(entry.getValue()).equals(this.text(persisted.get(entry.getKey())))) continue;
                throw new ServiceException("\u91c7\u6837\u5b57\u6bb5\u4fdd\u5b58\u540e\u56de\u8bfb\u4e0d\u4e00\u81f4\uff0c\u8bf7\u6838\u5bf9\u539f\u63d0\u4ea4", Integer.valueOf(409));
            }
            written.put("written", values.size());
            return written;
        }
        Long labTaskListId = this.parseLong(rowKey, "\u884c\u952e\u4e2d\u7684\u5b9e\u9a8c\u4efb\u52a1\u5217\u8868ID");
        Map existing = this.labEntryFormService.getByTask(labTaskListId, operatorUserId);
        if (existing == null) {
            throw new ServiceException("\u8be5\u5b9e\u9a8c\u4efb\u52a1\u8fd8\u6ca1\u6709\u5f55\u5165\u8868\uff0c\u8bf7\u5148\u5728\u5de5\u4f5c\u53f0\u521b\u5efa\u540e\u518d\u6279\u91cf\u5f55\u5165");
        }
        LinkedHashMap request = new LinkedHashMap();
        request.put("entry_form_id", existing.get("entry_form_id"));
        request.put("current_version", existing.get("version"));
        request.put("values", values);
        Map saved = this.labEntryFormService.saveDraft(request, operatorUserId);
        Map persisted = this.labEntryFormService.getByTask(labTaskListId, operatorUserId);
        Map persistedValues = persisted == null || !(persisted.get("values") instanceof Map) ? Collections.emptyMap() : (Map)persisted.get("values");
        for (Map.Entry<String, Object> entry : values.entrySet()) {
            if (Objects.equals(this.text(persistedValues.get(entry.getKey())), this.text(entry.getValue()))) continue;
            throw new ServiceException("\u5b9e\u9a8c\u4efb\u52a1 " + labTaskListId + " \u5b57\u6bb5 " + entry.getKey() + " \u9010\u884c\u8bfb\u56de\u4e0d\u4e00\u81f4\uff0c\u5df2\u62d2\u7edd\u62a5\u544a\u4fdd\u5b58\u6210\u529f");
        }
        written.put("written", values.size());
        if (saved != null && saved.get("qualityWarnings") instanceof List && !((List)saved.get("qualityWarnings")).isEmpty()) {
            written.put("qualityWarnings", saved.get("qualityWarnings"));
        }
        return written;
    }

    private Map<String, Object> values(Map<String, Object> row) {
        LinkedHashMap<String, Object> values = new LinkedHashMap<String, Object>();
        for (Map.Entry<String, Object> entry : row.entrySet()) {
            Object value;
            String key = entry.getKey();
            if (key == null || key.startsWith("__") || (value = entry.getValue()) == null || String.valueOf(value).isEmpty()) continue;
            values.put(key, value);
        }
        return values;
    }

    private EntryBatchRegion regionOf(Long templateId, Map<Long, EntryBatchRegion> cache) {
        EntryBatchRegion region;
        if (templateId == null) {
            return null;
        }
        if (cache != null && cache.containsKey(templateId)) {
            return cache.get(templateId);
        }
        SysDataTemplate template = this.templateMapper.selectById(templateId);
        EntryBatchRegion entryBatchRegion = region = template == null ? null : EntryBatchRegion.fromManifest(template.getLayoutManifest(), this.objectMapper);
        if (cache != null) {
            cache.put(templateId, region);
        }
        return region;
    }

    private void assertRegionMatchesTemplate(Long templateId, EntryBatchRegion region) {
        if (region == null) {
            return;
        }
        List problems = EntryRegionValidator.validate(this.declaredKeys(templateId), (EntryBatchRegion)region);
        if (!problems.isEmpty()) {
            throw new ServiceException("\u6a21\u677f\u5f55\u5165\u533a\u914d\u7f6e\u4e0e\u6a21\u677f\u5b57\u6bb5\u4e0d\u4e00\u81f4\uff08" + EntryRegionValidator.describe((List)problems) + "\uff09\u3002\u8bf7\u5728\u6a21\u677f\u7ba1\u7406\u91cc\u70b9\u300c\u6309\u6a21\u677f\u8868\u5934\u91cd\u5efa\u5217\u6620\u5c04\u300d\u540e\u91cd\u8bd5");
        }
    }

    private List<String> declaredKeys(Long templateId) {
        List fields = this.templateMapper.selectFieldsByTemplateId(templateId);
        ArrayList<String> keys = new ArrayList<String>();
        if (fields != null) {
            for (SysDataTemplateField field : fields) {
                keys.add(field.getFieldKey());
            }
        }
        return keys;
    }

    private void applySystemValues(String kind, Map<String, Object> row, EntryBatchRegion region, Long scopeId) {
        if (region == null) {
            return;
        }
        row.putAll(this.systemValues(kind, scopeId, this.text(row.get("__sampleNo")), this.text(row.get("__itemName")), region));
    }

    private Map<String, String> systemValues(String kind, Long scopeId, String sampleNo, String itemName, EntryBatchRegion region) {
        return this.systemValues(kind, scopeId, sampleNo, itemName, region, null);
    }

    private Map<String, String> systemValues(String kind, Long scopeId, String sampleNo, String itemName, EntryBatchRegion region, Map<String, Object> frozenValues) {
        LinkedHashMap<String, String> resolved = new LinkedHashMap<String, String>();
        if (region == null) {
            return resolved;
        }
        Map<String, Object> existing = frozenValues;
        TaskContext context = null;
        boolean contextLoaded = false;
        for (EntryBatchRegion.Column column : region.getColumns()) {
            String value;
            if (!column.systemFilled() || column.reserved()) continue;
            String sourceKey = column.resolvedSourceKey();
            if ("field".equals(sourceKey)) {
                if (existing == null) {
                    existing = this.existingValues(kind, scopeId, sampleNo);
                }
                value = this.text(existing.get(column.getFieldKey()));
            } else if ("row.sampleNo".equals(sourceKey)) {
                value = sampleNo == null ? "" : sampleNo;
            } else if ("row.itemName".equals(sourceKey)) {
                value = itemName == null ? "" : itemName;
            } else if ("task.itemName".equals(sourceKey)) {
                value = this.taskItemNames(kind, scopeId);
            } else if ("today".equals(sourceKey)) {
                value = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
            } else {
                if (!contextLoaded) {
                    context = this.taskContext(kind, scopeId);
                    contextLoaded = true;
                }
                value = this.resolveTaskSource(sourceKey, context);
            }
            if (value == null || value.isEmpty()) continue;
            resolved.put(column.getFieldKey(), value);
        }
        return resolved;
    }

    private String resolveTaskSource(String sourceKey, TaskContext context) {
        if (context == null) {
            return "";
        }
        switch (sourceKey) {
            case "order.orderNo": {
                return this.text(context.orderNo);
            }
            case "order.commissionedUnit": {
                return this.text(context.commissionedUnit);
            }
            case "order.inspectionUnit": {
                return this.text(context.inspectionUnit);
            }
            case "order.unitAddress": {
                return this.text(context.unitAddress);
            }
            case "order.projectType": {
                return this.text(context.projectType);
            }
            case "order.areaName": {
                return this.text(context.areaName);
            }
            case "order.createDate": {
                return this.text(context.createDate);
            }
            case "order.approvedDate": {
                return this.text(context.approvedDate);
            }
            case "task.taskNo": {
                return this.text(context.taskNo);
            }
            case "task.taskStartTime": {
                return EntryBatchServiceImpl.formatDate(context.taskStartTime);
            }
            case "task.taskEndTime": {
                return EntryBatchServiceImpl.formatDate(context.taskEndTime);
            }
        }
        log.warn("\u6279\u91cf\u5f55\u5165\u9047\u5230\u672a\u652f\u6301\u7684\u7cfb\u7edf\u751f\u6210\u6765\u6e90\uff1a{}", (Object)sourceKey);
        return "";
    }

    private Map<String, String> resolveHeaderValues(String kind, Long scopeId, List<EntryBatchHeaderCell> headerCells, List<String> unresolved) {
        LinkedHashMap<String, String> values = new LinkedHashMap<String, String>();
        if (headerCells == null || headerCells.isEmpty()) {
            return values;
        }
        TaskContext context = null;
        boolean contextLoaded = false;
        TProduct productMaster = null;
        boolean productLoaded = false;
        for (EntryBatchHeaderCell header : headerCells) {
            String value;
            if (header == null || !header.isSystem()) continue;
            String sourceKey = header.getSourceKey();
            if ("today".equals(sourceKey)) {
                value = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
            } else if ("task.itemName".equals(sourceKey)) {
                value = this.taskItemNames(kind, scopeId);
            } else if (sourceKey != null && sourceKey.startsWith("product.")) {
                if (!productLoaded) {
                    productMaster = this.loadFirstProductMaster(kind, scopeId);
                    productLoaded = true;
                }
                value = this.productHeaderSource(sourceKey, productMaster);
            } else {
                if (!contextLoaded) {
                    context = this.taskContext(kind, scopeId);
                    contextLoaded = true;
                }
                value = this.resolveTaskSource(sourceKey, context);
            }
            if (value == null || value.isEmpty()) {
                unresolved.add(this.headerDescription(header));
                continue;
            }
            values.put(header.key(), value);
        }
        return values;
    }

    private String productHeaderSource(String sourceKey, TProduct master) {
        switch (sourceKey) {
            case "product.samplingMethod": {
                return master == null ? "" : this.text(master.getSamplingMethod());
            }
            case "product.container": {
                return master == null ? "" : this.text(master.getContainer());
            }
            case "product.minSampling": {
                return master == null ? "" : this.joinHeaderValueUnit(master.getMinSampling(), master.getMinSamplingUnit());
            }
            case "product.preservationMeasures": {
                return master == null ? "" : this.text(master.getPreservationMeasures());
            }
            case "product.reagentFixativeMedium": {
                return master == null ? "" : this.text(master.getReagentFixativeMedium());
            }
            case "product.shelfLife": {
                return master == null ? "" : this.joinHeaderValueUnit(master.getShelfLifeValue(), master.getShelfLifeUnit());
            }
            case "product.blankSampleHint": {
                return this.positiveHeaderFlag(master == null ? null : master.getIsBlank()) ? "\u9700\u91c7\u73b0\u573a\u7a7a\u767d\u6837" : "";
            }
            case "product.parallelSampleHint": {
                return this.positiveHeaderFlag(master == null ? null : master.getIsParallel()) ? "\u9700\u91c7\u5e73\u884c\u6837" : "";
            }
        }
        return "";
    }

    private String joinHeaderValueUnit(BigDecimal value, String unit) {
        String suffix;
        String number = value == null ? "" : value.stripTrailingZeros().toPlainString();
        String string = suffix = unit == null ? "" : unit.trim();
        if (number.isEmpty()) {
            return suffix;
        }
        return suffix.isEmpty() ? number : number + " " + suffix;
    }

    private boolean positiveHeaderFlag(String flag) {
        return "1".equals(flag) || "true".equalsIgnoreCase(flag) || "\u662f".equals(flag);
    }

    private TProduct loadFirstProductMaster(String kind, Long scopeId) {
        if (scopeId == null || this.sysOrderProductMapper == null || this.tProductMapper == null) {
            return null;
        }
        try {
            Long orderProductId = null;
            if (KIND_SAMPLING.equals(kind)) {
                SysOrderTaskListProduct query = new SysOrderTaskListProduct();
                query.setTaskListId(scopeId);
                List rows = this.orderTaskListProductService.selectSysOrderTaskListProductList(query);
                if (rows != null) {
                    for (SysOrderTaskListProduct row : rows) {
                        if ("2".equals(row.getDelFlag()) || row.getOrderProductId() == null) continue;
                        orderProductId = row.getOrderProductId();
                        break;
                    }
                }
            } else {
                LabTaskList taskList = this.labTaskListMapper.selectLabTaskListById(scopeId);
                Long l = orderProductId = taskList == null ? null : taskList.getOrderProductId();
            }
            if (orderProductId == null) {
                return null;
            }
            SysOrderProduct orderProduct = this.sysOrderProductMapper.selectSysOrderProductById(orderProductId);
            if (orderProduct == null || orderProduct.getProductId() == null) {
                return null;
            }
            return this.tProductMapper.selectTProductByProductId(orderProduct.getProductId());
        }
        catch (RuntimeException error) {
            log.warn("\u8868\u5934\u56fa\u5b9a\u683c\u89e3\u6790\u4ea7\u54c1\u4e3b\u6863\u5931\u8d25 kind={} scopeId={}", new Object[]{kind, scopeId, error});
            return null;
        }
    }

    private String headerDescription(EntryBatchHeaderCell header) {
        StringBuilder text = new StringBuilder();
        if (header.getSheet() != null && !header.getSheet().isEmpty()) {
            text.append(header.getSheet()).append("!");
        }
        text.append(header.getCell());
        if (header.getLabel() != null && !header.getLabel().isEmpty()) {
            text.append("\uff08").append(header.getLabel()).append("\uff09");
        }
        return text.toString();
    }

    private TaskContext taskContext(String kind, Long scopeId) {
        SysOrder order;
        if (scopeId == null) {
            return null;
        }
        TaskContext context = new TaskContext();
        if (KIND_SAMPLING.equals(kind)) {
            SysOrderTaskList taskList = this.sysOrderTaskListMapper.selectSysOrderTaskListById(scopeId);
            if (taskList == null) {
                return null;
            }
            SysOrderTaskPool pool = taskList.getTaskPoolId() == null ? null : this.sysOrderTaskPoolMapper.selectSysOrderTaskPoolById(taskList.getTaskPoolId());
            SysOrder order2 = taskList.getOrderId() == null ? null : this.sysOrderMapper.selectSysOrderById(taskList.getOrderId());
            this.fillOrderContext(context, pool, order2);
            context.taskNo = taskList.getTaskNo();
            context.taskStartTime = taskList.getTaskStartTime();
            context.taskEndTime = taskList.getTaskEndTime();
            return context;
        }
        LabTaskList taskList = this.labTaskListMapper.selectLabTaskListById(scopeId);
        if (taskList == null) {
            return null;
        }
        LabTaskPool pool = taskList.getLabTaskPoolId() == null ? null : this.labTaskPoolMapper.selectLabTaskPoolById(taskList.getLabTaskPoolId());
        SysOrder sysOrder = order = pool == null || pool.getOrderId() == null ? null : this.sysOrderMapper.selectSysOrderById(pool.getOrderId());
        if (pool != null) {
            context.orderNo = pool.getOrderNo();
            context.commissionedUnit = pool.getCommissionedUnit();
            context.inspectionUnit = pool.getInspectionUnit();
            context.unitAddress = pool.getUnitAddress();
            context.projectType = pool.getProjectType();
            context.taskNo = pool.getTaskNo();
        }
        if (order != null) {
            context.orderNo = context.orderNo == null ? order.getOrderNo() : context.orderNo;
            context.areaName = order.getAreaName();
            context.createDate = order.getCreateDate();
            context.approvedDate = order.getApprovedDate();
        }
        return context;
    }

    private void fillOrderContext(TaskContext context, SysOrderTaskPool pool, SysOrder order) {
        if (pool != null) {
            context.orderNo = pool.getOrderNo();
            context.commissionedUnit = pool.getCommissionedUnit();
            context.inspectionUnit = pool.getInspectionUnit();
            context.unitAddress = pool.getUnitAddress();
            context.projectType = pool.getProjectType();
        }
        if (order != null) {
            context.orderNo = context.orderNo == null ? order.getOrderNo() : context.orderNo;
            context.projectType = context.projectType == null ? order.getProjectType() : context.projectType;
            context.areaName = order.getAreaName();
            context.createDate = order.getCreateDate();
            context.approvedDate = order.getApprovedDate();
        }
    }

    private static String formatDate(Date value) {
        return value == null ? "" : new SimpleDateFormat("yyyy-MM-dd").format(value);
    }

    private Map<String, Object> existingValues(String kind, Long scopeId, String sampleNo) {
        String json = null;
        try {
            LabEntryForm form;
            if (KIND_SAMPLING.equals(kind)) {
                if (scopeId != null && sampleNo != null && !sampleNo.isEmpty()) {
                    form = this.samplingEntryFormMapper.selectByTaskAndSample(scopeId, sampleNo);
                    json = form == null ? null : form.getValuesJson();
                }
            } else if (scopeId != null) {
                form = this.labEntryFormMapper.selectByTaskListId(scopeId);
                String string = json = form == null ? null : form.getValuesJson();
            }
            if (json == null || json.trim().isEmpty()) {
                return new LinkedHashMap<String, Object>();
            }
            Map parsed = (Map)this.objectMapper.readValue(json, (TypeReference)new TypeReference<Map<String, Object>>(){});
            return parsed == null ? new LinkedHashMap() : parsed;
        }
        catch (Exception error) {
            log.warn("\u6279\u91cf\u5f55\u5165\u8bfb\u53d6\u7cfb\u7edf\u503c\u5931\u8d25\uff08{} / {} / {}\uff09\uff1a{}", new Object[]{kind, scopeId, sampleNo, error.getMessage()});
            return new LinkedHashMap<String, Object>();
        }
    }

    private Long scopeOf(String kind, String rowKey) {
        if (rowKey == null || rowKey.isEmpty()) {
            return null;
        }
        if (KIND_SAMPLING.equals(kind)) {
            int split = rowKey.indexOf(124);
            return split <= 0 ? null : this.parseLong(rowKey.substring(0, split), "\u884c\u952e\u4e2d\u7684\u4efb\u52a1\u5217\u8868ID");
        }
        return this.parseLong(rowKey, "\u884c\u952e\u4e2d\u7684\u5b9e\u9a8c\u4efb\u52a1\u5217\u8868ID");
    }

    private String sampleNoOf(String kind, String rowKey) {
        if (!KIND_SAMPLING.equals(kind) || rowKey == null) {
            return null;
        }
        int split = rowKey.indexOf(124);
        return split <= 0 ? null : rowKey.substring(split + 1);
    }

    private Map<String, Object> buildGroup(Long templateId) {
        SysDataTemplate template = this.templateMapper.selectById(templateId);
        if (template == null) {
            throw new ServiceException("\u6a21\u677f\u4e0d\u5b58\u5728\uff1a" + templateId);
        }
        EntryBatchRegion region = EntryBatchRegion.fromManifest(template.getLayoutManifest(), this.objectMapper);
        if (region == null || region.getColumns() == null || region.getColumns().isEmpty()) {
            throw new ServiceException("\u6a21\u677f\u3010" + template.getTemplateName() + "\u3011\u672a\u914d\u7f6e\u5f55\u5165\u533a\uff08entryRegion\uff09\uff0c\u8bf7\u5148\u5728\u6a21\u677f\u7ba1\u7406\u4e2d\u914d\u7f6e");
        }
        ArrayList columns = new ArrayList();
        for (EntryBatchRegion.Column column : region.getColumns()) {
            LinkedHashMap<String, Object> item = new LinkedHashMap<String, Object>();
            item.put("col", column.getCol());
            item.put("fieldKey", column.getFieldKey());
            item.put("reserved", column.reserved());
            item.put("source", column.systemFilled() ? "SYSTEM" : "MANUAL");
            item.put("sourceKey", column.resolvedSourceKey());
            columns.add(item);
        }
        LinkedHashMap<String, Object> group = new LinkedHashMap<String, Object>();
        group.put("templateId", templateId);
        group.put("templateName", template.getTemplateName());
        group.put("templateVersion", template.getTemplateVersion());
        group.put("columns", columns);
        group.put("rows", new ArrayList());
        return group;
    }

    private Resolved resolve(String kind, Map<String, Object> item, Long operatorUserId) {
        Long templateId;
        String rowKey;
        Resolved resolved = new Resolved();
        if (KIND_SAMPLING.equals(kind)) {
            Long taskListId = this.longValue(item, "taskListId", "task_list_id");
            String sampleNo = this.textValue(item, "sampleNo", "sample_no");
            if (taskListId == null || sampleNo == null || sampleNo.isEmpty()) {
                int split;
                String rowKey2 = this.textValue(item, "__rowKey");
                int n = split = rowKey2 == null ? -1 : rowKey2.indexOf(124);
                if (split > 0) {
                    if (taskListId == null) {
                        taskListId = this.parseLong(rowKey2.substring(0, split), "\u884c\u952e\u4e2d\u7684\u4efb\u52a1\u5217\u8868ID");
                    }
                    if (sampleNo == null || sampleNo.isEmpty()) {
                        sampleNo = rowKey2.substring(split + 1);
                    }
                }
            }
            if (taskListId == null || taskListId <= 0L) {
                throw new ServiceException("\u7f3a\u5c11\u4efb\u52a1\u5217\u8868ID\uff08taskListId\uff09");
            }
            if (sampleNo == null || sampleNo.isEmpty()) {
                throw new ServiceException("\u7f3a\u5c11\u6837\u54c1\u7f16\u53f7\uff08sampleNo\uff09");
            }
            this.requireSamplingAccess(taskListId, sampleNo, operatorUserId);
            Long templateId2 = this.resolveSamplingTemplateId(taskListId, sampleNo);
            if (templateId2 == null) {
                throw new ServiceException("\u8be5\u4efb\u52a1\u5217\u8868\u672a\u7ed1\u5b9a\u91c7\u6837\u6a21\u677f\uff0c\u8bf7\u5148\u5728\u4ea7\u54c1/\u4efb\u52a1\u5217\u8868\u4e0a\u7ed1\u5b9a\u6a21\u677f");
            }
            resolved.templateId = templateId2;
            resolved.scopeId = taskListId;
            LinkedHashMap<String, String> row = new LinkedHashMap<String, String>();
            row.put("__rowKey", taskListId + "|" + sampleNo);
            row.put("__sampleNo", sampleNo);
            row.put("__itemName", "");
            resolved.row = row;
            return resolved;
        }
        Long labTaskListId = this.longValue(item, "labTaskListId", "lab_task_list_id", "labTestItemId", "lab_test_item_id");
        if (labTaskListId == null && (rowKey = this.textValue(item, "__rowKey")) != null && !rowKey.isEmpty()) {
            labTaskListId = this.parseLong(rowKey, "\u884c\u952e\u4e2d\u7684\u5b9e\u9a8c\u4efb\u52a1\u5217\u8868ID");
        }
        if (labTaskListId == null || labTaskListId <= 0L) {
            throw new ServiceException("\u7f3a\u5c11\u5b9e\u9a8c\u4efb\u52a1\u5217\u8868ID\uff08labTaskListId\uff09");
        }
        LinkedHashMap<String, Long> request = new LinkedHashMap<String, Long>();
        request.put("lab_test_item_id", labTaskListId);
        Map match = this.labEntryFormService.matchTemplate(request, operatorUserId);
        Long l = templateId = match == null ? null : this.numberToLong(match.get("template_id"));
        if (templateId == null) {
            throw new ServiceException("\u8be5\u5b9e\u9a8c\u4efb\u52a1\u672a\u5339\u914d\u5230\u6a21\u677f");
        }
        resolved.templateId = templateId;
        resolved.scopeId = labTaskListId;
        LinkedHashMap<String, String> row = new LinkedHashMap<String, String>();
        row.put("__rowKey", String.valueOf(labTaskListId));
        row.put("__sampleNo", "");
        row.put("__itemName", this.text(match.get("template_name")));
        resolved.row = row;
        return resolved;
    }

    private void requireSamplingAccess(Long taskId, String sampleNo, Long actor) {
        this.batchReceipts.requireTask(KIND_SAMPLING, taskId, actor, TransactionSynchronizationManager.isActualTransactionActive());
        if (!Integer.valueOf(1).equals(this.samplingEntryMapper.countBoundSample(taskId, sampleNo))) {
            throw new ServiceException("\u8be5\u6837\u54c1\u672a\u7ed1\u5b9a\u5230\u5f53\u524d\u4efb\u52a1", Integer.valueOf(403));
        }
        SamplingEntryForm form = this.samplingEntryFormMapper.selectByTaskAndSample(taskId, sampleNo);
        if (form != null && !actor.equals(form.getOperatorUserId())) {
            throw new ServiceException("\u8be5\u6837\u54c1\u5f55\u5165\u8868\u4e0d\u5c5e\u4e8e\u5f53\u524d\u8d26\u53f7", Integer.valueOf(403));
        }
    }

    private void prefillValues(Map<String, Object> existing, Map<String, Object> row, EntryBatchRegion region) {
        if (existing == null || existing.isEmpty()) {
            return;
        }
        for (EntryBatchRegion.Column column : region.getColumns()) {
            String text;
            String key;
            Object value;
            if (column.reserved() || column.systemFilled() || (value = (key = column.getFieldKey()) == null ? null : existing.get(key)) == null || (text = this.text(value)).isEmpty()) continue;
            row.put(key, text);
        }
    }

    private Long resolveSamplingTemplateId(Long taskListId, String sampleNo) {
        Long byPoint = this.samplingPointTemplateId(taskListId, sampleNo);
        if (byPoint != null) {
            return byPoint;
        }
        Map template = this.samplingEntryMapper.selectSamplingTemplateByTaskListId(taskListId);
        return template == null ? null : this.numberToLong(template.get("template_id"));
    }

    private Long samplingPointTemplateId(Long taskListId, String sampleNo) {
        try {
            SysOrderTaskListProduct matched;
            Long pointId = null;
            List samples = this.mobileSamplingSampleMapper.selectByTaskListId(taskListId);
            if (samples != null) {
                for (MobileSamplingSample sample : samples) {
                    if (sampleNo == null || !sampleNo.equals(this.text(sample.getSampleNo()))) continue;
                    pointId = sample.getSamplingPointId();
                    break;
                }
            }
            if (pointId == null) {
                return null;
            }
            SysOrderTaskListProduct query = new SysOrderTaskListProduct();
            query.setTaskListId(taskListId);
            List rows = this.orderTaskListProductService.selectSysOrderTaskListProductList(query);
            ArrayList<SysOrderTaskListProduct> alive = new ArrayList<SysOrderTaskListProduct>();
            if (rows != null) {
                for (SysOrderTaskListProduct row : rows) {
                    if ("2".equals(row.getDelFlag())) continue;
                    alive.add(row);
                }
            }
            return (matched = TaskSamplingPointResolver.resolve(alive, (Long)pointId)) == null ? null : matched.getSamplingTemplateId();
        }
        catch (RuntimeException error) {
            log.warn("\u6309\u6837\u54c1\u70b9\u4f4d\u89e3\u6790\u91c7\u6837\u6a21\u677f\u5931\u8d25\uff0c\u56de\u843d\u4efb\u52a1\u7ea7\u53e3\u5f84 taskListId={} sampleNo={}", new Object[]{taskListId, sampleNo, error});
            return null;
        }
    }

    private String taskItemNames(String kind, Long scopeId) {
        if (scopeId == null) {
            return "";
        }
        try {
            if (KIND_SAMPLING.equals(kind)) {
                SysOrderTaskListProduct query = new SysOrderTaskListProduct();
                query.setTaskListId(scopeId);
                List rows = this.orderTaskListProductService.selectSysOrderTaskListProductList(query);
                LinkedHashSet<String> names = new LinkedHashSet<String>();
                if (rows != null) {
                    for (SysOrderTaskListProduct row : rows) {
                        String name;
                        if ("2".equals(row.getDelFlag()) || (name = this.text(row.getProductSecondItem())).isEmpty()) continue;
                        names.add(name);
                    }
                }
                return String.join((CharSequence)"\u3001", names);
            }
            LabTaskList labTask = this.labTaskListMapper.selectLabTaskListById(scopeId);
            return labTask == null ? "" : this.text(labTask.getProductSecondItem());
        }
        catch (RuntimeException error) {
            log.warn("\u89e3\u6790\u4efb\u52a1\u68c0\u6d4b\u9879\u76ee\u5931\u8d25\uff0c\u6309\u7a7a\u5904\u7406 kind={} scopeId={}", new Object[]{kind, scopeId, error});
            return "";
        }
    }

    private Map<String, Object> problem(Map<String, Object> item, String reason) {
        LinkedHashMap<String, Object> problem = new LinkedHashMap<String, Object>();
        problem.put("item", item);
        problem.put("reason", reason);
        return problem;
    }

    private Long parseTemplateId(String fileId) {
        if (fileId == null || fileId.trim().isEmpty()) {
            return null;
        }
        try {
            return Long.valueOf(fileId.trim());
        }
        catch (NumberFormatException error) {
            return null;
        }
    }

    static LinkedHashSet<String> draftRowKeys(String kind, List<Map<String, Object>> items) {
        if (!KIND_LAB.equals(kind) && !KIND_SAMPLING.equals(kind)) {
            throw new ServiceException("\u6279\u91cf\u5f55\u5165\u7c7b\u578b\u53ea\u80fd\u662f sampling\uff08\u91c7\u6837\uff09\u6216 lab\uff08\u5b9e\u9a8c\uff09");
        }
        if (items == null || items.isEmpty()) {
            throw new ServiceException("\u8bf7\u5148\u52fe\u9009\u9700\u8981\u6279\u91cf\u5f55\u5165\u7684\u8bb0\u5f55");
        }
        LinkedHashSet<String> keys = new LinkedHashSet<String>();
        for (Map<String, Object> item : items) {
            String key;
            String string = key = KIND_LAB.equals(kind) ? EntryBatchServiceImpl.labDraftRowKey(item) : EntryBatchServiceImpl.samplingDraftRowKey(item);
            if (key != null && !key.isEmpty() && keys.add(key)) continue;
            throw new ServiceException("\u6279\u91cf\u8349\u7a3f\u884c\u952e\u4e0d\u5b8c\u6574\u6216\u91cd\u590d");
        }
        return keys;
    }

    private static String labDraftRowKey(Map<String, Object> item) {
        Long id = EntryBatchServiceImpl.firstLong(item, "labTaskListId", "lab_task_list_id", "labTestItemId", "lab_test_item_id");
        if (id == null) {
            id = EntryBatchServiceImpl.positiveLong(EntryBatchServiceImpl.firstText(item, "__rowKey"));
        }
        return id == null ? null : String.valueOf(id);
    }

    private static String samplingDraftRowKey(Map<String, Object> item) {
        Long taskListId = EntryBatchServiceImpl.firstLong(item, "taskListId", "task_list_id");
        String sampleNo = EntryBatchServiceImpl.firstText(item, "sampleNo", "sample_no");
        if (taskListId == null || sampleNo == null || sampleNo.isEmpty()) {
            int split;
            String rowKey = EntryBatchServiceImpl.firstText(item, "__rowKey");
            int n = split = rowKey == null ? -1 : rowKey.indexOf(124);
            if (split > 0) {
                if (taskListId == null) {
                    taskListId = EntryBatchServiceImpl.positiveLong(rowKey.substring(0, split));
                }
                if (sampleNo == null || sampleNo.isEmpty()) {
                    sampleNo = rowKey.substring(split + 1);
                }
            }
        }
        if (taskListId == null || sampleNo == null || sampleNo.isEmpty()) {
            return null;
        }
        return taskListId + "|" + sampleNo;
    }

    private static Long firstLong(Map<String, Object> item, String ... keys) {
        for (String key : keys) {
            Long number = EntryBatchServiceImpl.positiveLong(item == null ? null : item.get(key));
            if (number == null) continue;
            return number;
        }
        return null;
    }

    private static String firstText(Map<String, Object> item, String ... keys) {
        if (item == null) {
            return null;
        }
        for (String key : keys) {
            String text;
            Object value = item.get(key);
            if (value == null || (text = String.valueOf(value).trim()).isEmpty() || "null".equals(text)) continue;
            return text;
        }
        return null;
    }

    private static Long positiveLong(Object value) {
        long number;
        if (value == null) {
            return null;
        }
        if (value instanceof Number) {
            number = ((Number)value).longValue();
        } else {
            try {
                number = Long.parseLong(String.valueOf(value).trim());
            }
            catch (NumberFormatException error) {
                return null;
            }
        }
        return number > 0L ? Long.valueOf(number) : null;
    }

    private String normalizeKind(String kind) {
        String value;
        String string = value = kind == null ? "" : kind.trim().toLowerCase();
        if (!KIND_SAMPLING.equals(value) && !KIND_LAB.equals(value)) {
            throw new ServiceException("\u6279\u91cf\u5f55\u5165\u7c7b\u578b\u53ea\u80fd\u662f sampling\uff08\u91c7\u6837\uff09\u6216 lab\uff08\u5b9e\u9a8c\uff09");
        }
        return value;
    }

    private String businessTable(String kind, Long templateId) {
        return (KIND_LAB.equals(kind) ? BIZ_LAB : BIZ_SAMPLING) + "_" + templateId;
    }

    private Long longValue(Map<String, Object> item, String ... keys) {
        for (String key : keys) {
            Object value = item == null ? null : item.get(key);
            Long number = this.numberToLong(value);
            if (number == null) continue;
            return number;
        }
        return null;
    }

    private String textValue(Map<String, Object> item, String ... keys) {
        for (String key : keys) {
            Object value = item == null ? null : item.get(key);
            String text = this.text(value);
            if (text.isEmpty()) continue;
            return text;
        }
        return null;
    }

    private Long numberToLong(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof Number) {
            return ((Number)value).longValue();
        }
        try {
            return Long.valueOf(String.valueOf(value).trim());
        }
        catch (NumberFormatException error) {
            return null;
        }
    }

    private Long parseLong(String value, String label) {
        Long number = this.numberToLong(value);
        if (number == null || number <= 0L) {
            throw new ServiceException(label + "\u975e\u6cd5\uff0c\u5df2\u62d2\u7edd\u8be5\u884c");
        }
        return number;
    }

    private String text(Object value) {
        return value == null ? "" : String.valueOf(value).trim();
    }

    private String trimTrailingSlash(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new ServiceException("OnlyOffice\u6587\u6863\u670d\u52a1\u5730\u5740\u672a\u914d\u7f6e");
        }
        return value.trim().replaceAll("/+$", "");
    }

    private String sha256(byte[] content) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256").digest(content == null ? new byte[]{} : content);
            StringBuilder result = new StringBuilder(digest.length * 2);
            for (byte item : digest) {
                result.append(String.format("%02x", item & 0xFF));
            }
            return result.toString();
        }
        catch (Exception error) {
            throw new ServiceException("\u8ba1\u7b97\u6279\u91cf\u5de5\u4f5c\u7c3f\u6458\u8981\u5931\u8d25");
        }
    }

    private static final class Resolved {
        private Long templateId;
        private Long scopeId;
        private String templateSha;
        private Map<String, Object> values;
        private Map<String, Object> row;

        private Resolved() {
        }
    }

    private static class TaskContext {
        private String orderNo;
        private String commissionedUnit;
        private String inspectionUnit;
        private String unitAddress;
        private String projectType;
        private String areaName;
        private String createDate;
        private String approvedDate;
        private String taskNo;
        private Date taskStartTime;
        private Date taskEndTime;

        private TaskContext() {
        }
    }
}
