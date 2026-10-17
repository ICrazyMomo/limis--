# OPS-MOUNT · tip-genplan-entry-batch-source-2d8dd3d8

## 挂序
1. **DDL BEFORE**：`ddl/01-create-entry_batch_source.sql`（须产品准写+BEFORE 确认）
2. PRE 核：`EditTaskListFile-F5YzS4W5.js` sha8=`adb609b1`；`entryBatch-vbmxXr3M.js` sha8=`62d5cc9b`；≠停
3. 同名覆写 dist/assets 两文件
4. 核 NEW sha8：ETL=`d34b7f7a` · EB=`c3a11745`
5. 叠基 jar FINAL 挂前实测认 `7080b882`（本 tip 无 jar 类覆写；漂记旁证不停 FE）
6. 回滚：还原 ORIG 两文件 + 可选 `ddl/99-rollback-drop-entry_batch_source.sql`（须书面）

## 禁
自 LIVE 当 PASS；灌行；动案1；密钥进件。
