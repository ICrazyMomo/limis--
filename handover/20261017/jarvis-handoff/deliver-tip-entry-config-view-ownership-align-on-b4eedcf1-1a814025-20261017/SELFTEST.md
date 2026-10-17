# SELFTEST · entry-config view ownership align

墙钟：2026-10-17 Asia/Shanghai · major 52 · ASM 叠 ORIG

## 静态
见 `selftest/static-check.sh`：
- major=52
- PATCH sha16=`d05982909028486a`
- ORIG sha16=`5b05565b4f7e0250`；cmp ORIG≢PATCH
- inners KEEP cmp ≡
- javap config：`ifnull`/`ifle` 目标为 403 throw；ownership 失败路径含 `ldc edit` + `ifeq` 旁路
- strings 仍含「批量录入工作簿不存在或不属于当前账号」

## 未做
运行时挂载 / LIVE / HTTP 探针（禁自 LIVE；等放行）。
