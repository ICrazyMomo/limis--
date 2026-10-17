# DIFF · entry-resolve-draft found+fileKey

## ① findActiveDraft（主刀）
- `entry_batch_source` 查询包 try/catch(`RuntimeException`)：缺表/SQL → 空列表 fail-soft（不抛未知异常）。
- 活跃编辑草稿命中且 `formsStillDraft` → 原契约 `found+fileKey+sourceReceiptSha256…`（保持）。
- 编辑草稿匹配但非 DRAFT → `continue`（不再硬 `return none`），便于回退权威回读。
- 末尾调用 `findAuthoritativeReadback`；命中则返回；否则 `found:false`。

## ② findAuthoritativeReadback（新增私有）
- 仅 `kind=lab`。
- 对每个 `rowKey`（lab_task_list_id）只读：
  `select … from sys_temp_file where foreign_key=? and file_type='06' and del_flag='0' and business_table_name='sys_lab_entry_readback_'+templateId`
- 多 key 须共享同一 `file_key`；`file_id` 若非空须≡templateId。
- **不**要求 `create_user==actor`（查看录入可他审/admin）。
- **不**生成 / **不** insert / **不** update。

## ③ 未改
- Controller.resolveDraft / ServiceImpl.resolveDraft 转调链
- liveEditFile 仍拒 readback/view_cache（编辑会话身份不变）
- registerGeneration / createDocument 路径

## 编法
JDK8 `javac -source 1.8 -target 1.8` 重编 `EntryBatchReceiptService`（CFR 还原+刀面补丁）；major **52**。\$1 随编；RowWriter 字节≡ORIG。
