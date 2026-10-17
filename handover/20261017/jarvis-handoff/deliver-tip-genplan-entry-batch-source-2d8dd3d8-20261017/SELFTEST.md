# SELFTEST · 静态

| # | 项 | 期望 |
|---|---|---|
| 1 | ORIG ETL sha16 | adb609b17e331c9d ≡ LIVE OPS-RO |
| 2 | NEW ETL ≠ ORIG | 是 |
| 3 | NEW 含「文档保存核验失败」 | ≥1 |
| 4 | NEW 无笼统 Boss INVALID 全文 | 0 |
| 5 | NEW 含 `{ok:!0,params:null}` 路 A | 是 |
| 6 | entryBatch NEW 含 returnBusinessResponse 于 force-save/status | 是 |
| 7 | entryBatch 其它 API 仍 silentBusinessError | 是 |
| 8 | DDL CREATE IF NOT EXISTS entry_batch_source | 是 |
| 9 | 包内无密钥 / 无案1 id | 是 |
