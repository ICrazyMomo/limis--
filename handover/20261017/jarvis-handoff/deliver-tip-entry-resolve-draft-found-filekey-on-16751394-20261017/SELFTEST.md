# SELFTEST · entry-resolve-draft found+fileKey · 盒内（禁 LIVE）

墙钟：2026-10-17 Asia/Shanghai · major 52 · javac 重编 Receipt

| 线 | 场景 | 期望 | 结果 |
|---|---|---|---|
| major | PATCH Receipt | 52 | 见下方自动核 |
| 方法 | javap 含 `findAuthoritativeReadback` | 有 | 见自动核 |
| strings | `sys_lab_entry_readback_` + foreign_key 查询 | 有 | 见自动核 |
| 禁生成 | findActiveDraft/findAuthoritativeReadback 无 insert/generate 调用 | 无默认生成 | 见自动核 |
| KEEP | Controller/Impl/I/RowWriter | 未改交件覆写面 | 清单 KEEP |
| ORIG≠PATCH | Receipt sha | 8301b661→0a6ac4d9 | 见 SHA16 |

未 LIVE；未写库；开测/开刷另令。
