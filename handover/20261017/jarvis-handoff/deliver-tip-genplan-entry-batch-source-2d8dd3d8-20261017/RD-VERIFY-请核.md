# RD-VERIFY-请核 · tip-genplan-entry-batch-source-2d8dd3d8

## 核项
1. 分支 `tip/genplan-entry-batch-source-on-7080b882-20261017` + 短sha `2d8dd3d8` + 叠基 FINAL `7080b882` + tag `tip/2d8dd3d8-on-7080b882`
2. 全量覆写清单 2 条 PRE→NEW；共享入口声明不覆写
3. DDL 列 ⊇ OPS SQL：actor_id,file_key,source_json,source_sha256,created_at；无猜列
4. 路 A：chunk 仍含未编辑早退 `{ok:!0,params:null}`
5. 乙：INVALID 笼统 Boss 文案已替换为「文档保存核验失败…」；entryBatch force/status 为 returnBusinessResponse
6. 无 Core jar；无密钥；案1 未碰
7. 验收句 V1/V2/V3 写入 HANDOFF；**挂上≠PASS**

## 静态自测
见 SELFTEST.md（node；非公网 PASS）。
