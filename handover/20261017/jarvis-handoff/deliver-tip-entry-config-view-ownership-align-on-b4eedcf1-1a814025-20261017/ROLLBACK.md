# ROLLBACK · entry-config view ownership align

1. 将 nested `EntryBatchServiceImpl.class` 回 ORIG `5b05565b4f7e0250`（本包 `orig/`）。
2. inners 若曾写入 KEEP 字节可不动。
3. 重启 Core；CAPTCHA 200；Impl sha16 ≡ `5b05565b`。
4. 禁动 Receipt / Controller / 甲 FE。
