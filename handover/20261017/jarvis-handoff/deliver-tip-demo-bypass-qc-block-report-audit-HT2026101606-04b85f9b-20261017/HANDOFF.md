# HANDOFF · tip demo-bypass-qc-block-report-audit · PRE b4eedcf1 · 20261017

**HANDOFF 尚无放行章。**

**交 limis-研发 RD-VERIFY → 产品放行 → 运维 LIVE。本专线不自挂 / 不自 LIVE。**

## 产物
| 项 | 值 |
|---|---|
| 目录 | `/workspace/artifacts/deliver-tip-demo-bypass-qc-block-report-audit-HT2026101606-04b85f9b-20261017/` |
| tgz | `core-tip-demo-bypass-qc-block-report-audit-HT2026101606-04b85f9b-20261017.tgz` · **权威 sha16 见** `SHA16-TGZ.txt` / `stamps/TGZ.sha16` |
| 短 sha | `0955febf`（全长 `0955febf3227aef2ca5114808be36120b824c624`） |
| tag | `tip/0955febf-on-b4eedcf1` |
| 分支 | `tip/demo-bypass-qc-block-report-audit-HT2026101606-04b85f9b-20261017` |
| PRE | **`b4eedcf1`** |
| ORIG class sha16 | `bb4d9ec345d066be` |
| PATCH class sha16 | `e7d2f3b18c2fe075` |
| major | **52** |

## 准修
| 项 | sha16 |
|---|---|
| 准修 | `04b85f9b81fb907b` |
| EXTRACT MANIFEST | `5a764206` |

## 刀面
1. **必做**：`reportSignEntryBlock` / `reportSignEntryBlockByPool` admin∧本单早退 null（采样+实验整闸）
2. 范围钉：admin ∧（HT2026101606 / orderId 900354 / QTP57 / LTP901082）

## 恢复法（还债 D1 · 演示收口立刻）
1. **撤旁路（推荐）**：用本包 `orig/` ORIG class（sha16=`bb4d9ec345d066be`）覆回 nested `lei-system-1.0.0.jar` 同路径成员并重启 → 闸恢复。
2. **关开关**：本 tip **无**独立配置总开关；恢复=撤 class 旁路（上条）。勿留 PATCH 长期挂。
3. AFTER：admin·本单·工作台应再出现 `reportSignEntryBlock`=Tc（质控未过完时）。

## 红线
禁自 LIVE；禁写库；禁案1；禁密钥；禁领样；禁 FE；挂上≠PASS；旁路须可回滚。
