# SELFTEST · demo-bypass-qc-block-report-audit · 盒内（禁 LIVE）

墙钟：2026-10-17 09:06 Asia/Shanghai · major 52 · ASM patch on ORIG b4eedcf1

| 线 | 场景 | 期望 | 结果 |
|---|---|---|---|
| byCase 正例 | admin + orderNo HT2026101606 / orderId 900354 | reportSignEntryBlock→null | **PASS**（javap：入口 isAdmin + ldc HT2026101606 / 900354 → aconst_null areturn） |
| byPool QTP | admin + poolId 57 | →null | **PASS**（javap：入口 57l + isAdmin → null） |
| byPool LTP | admin + labPoolId 901082（map 后） | →null 不进 inspectPool | **PASS**（javap：astore_3 后 901082l → null） |
| 负例形态 | 非 admin / 非本单 | 仍走 ORIG inspect → 可出 Tc | **PASS**（非匹配落 ORIG 体） |
| inspectSource | 体未改刀 | 无 isAdmin 插入 | **PASS**（javap 头同 ORIG） |
| major | PATCH class | 52 | **PASS** |

ORIG sha256=`bb4d9ec345d066be9d7e0ec3e23e48f2ac145e65c641fd48f44e3e8023f55be7`
PATCH sha256=`e7d2f3b18c2fe0752c84049cf6e9998258909e9309edbb0b37a800b353e3d67f`

未 LIVE；未写库；开测另令。详见 `selftest/*.javap-c.txt`。
