# entry_batch_source 列出处

| 列 | 出处 | 类型选定 |
|---|---|---|
| actor_id | OPS-RAW/DIAG SQL `where actor_id=?` | bigint NOT NULL |
| file_key | SELECT 列；PK（requireSource/fileKey） | varchar(64) NOT NULL |
| source_json | SELECT 列 | mediumtext NOT NULL |
| source_sha256 | SELECT 列 | char(64) NOT NULL |
| created_at | SELECT 列；`order by created_at desc` | datetime(3) NOT NULL |

索引：`PRIMARY(file_key)` + `idx_ebs_actor_created_file(actor_id,created_at,file_key)` 对齐 findActiveDraft 排序。
同族其它 receipt 表：本枪 OPS 未给出第二表 SQL 字面 → **本 tip 不建**（禁猜）。
