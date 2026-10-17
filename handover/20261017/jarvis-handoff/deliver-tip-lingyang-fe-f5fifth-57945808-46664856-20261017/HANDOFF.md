# HANDOFF · 领样 F5⁵ FE tip（中文义：相位钉死 + 空窗持续门）· 2026-10-17
> **叠章**：准修 `57945808ab84daac`（A 相位钉死 + B 空窗持续门；旧 F5′″‴/F5quara 保留）· 采信 DIAG `91c65ccbc6abed40` · 基线 tip `6d70a485`/LIVE FE `3b7a8a6a`
> **追溯**：分支 `tip/lingyang-fe-f5fifth-on-7080b882-20261017` · 短sha `46664856` · 叠基 FINAL `7080b882` · tag `tip/46664856-on-7080b882`（本地已打，未推）

## ① 产物在不在（路径+sha）
| 产物 | 路径 | sha256 / sha16 | 在？ |
|---|---|---|---|
| 交件目录 | `/workspace/artifacts/deliver-tip-lingyang-fe-f5fifth-57945808-46664856-20261017/` | — | 在 |
| tgz | `tip-lingyang-fe-f5fifth-57945808-46664856-20261017.tgz` | sha16 见包外 `SHA16-TGZ.txt`（包外为准） | 在 |
| FE NEW | `dist/assets/LabSampleHandoverPanel-B5RJ_HtO.js` | `50ea6b9fd94fcec190d6e0bd778232645a07c9d78368873f50a3c8903fe822b8` · sha16 `50ea6b9fd94fcec1` | 在 |
| FE ORIG（=现网 LIVE / tip 6d70a485 NEW） | `orig/LabSampleHandoverPanel-B5RJ_HtO.js` | `3b7a8a6a443b1e9bec72e41c7af3e33674869526c59f87211becf75ef8b21a75` · sha16 `3b7a8a6a443b1e9b` | 在 |

## ② 放行章
**尚无放行章**。禁自 LIVE；交件后停。路径：RD-VERIFY → 产品另盖放行 → 运维 LIVE → 测侧重刷（硬门槛 E：RESULTS 必贴 Vue phase/record.id/state/error/te + Network verification 与 view-sessions 是否发出）。

## 挂前实测认（HANDOFF 必写）
| 项 | 值 | 出处 |
|---|---|---|
| 现网 Handover FE | **`3b7a8a6a`**（≡ tip 6d70a485 NEW） | Handover MATCH `1e4ad9ac`；DIAG `91c65ccb` |
| Core FINAL 观察 | **`7080b882`**（jar sha16；FE-only 不改） | OPS-LIVE 领样 F5prime/F5quara 记 CORE=7080b882 |
| 本票 ORIG 闸 | 挂前必须 ≡ `3b7a8a6a…`；≠则停 | 本包 `orig/` |
| 共享入口 B3030 | **不覆写** | 全量覆写清单 |

## 基座说明
- FINAL 按令认 **`7080b882`**（现网 Core jar 观察钉）；本包 **仅 FE**，不触 jar。
- FE 门禁 ORIG=**`3b7a8a6a`**（已核 ≡ 前枪 tip 6d70a485 NEW / 现网 LIVE）；≠则停。
- 做法：在 LIVE chunk（6d70a485 NEW）pretty 上加深 → esbuild 压缩 → 同名覆写。可读源：`src/patched-pretty.js`。
- **禁复挂** tip `6d70a485`；**禁覆盖**旧 f5quad/edde tgz。

## 禁并项声明
未合入 ρ/f95/AME/SoD/WorkspaceAccess/④；未改 Core/jar；未灌 C1–C3；未碰案1 QC-900421；无密钥进件；禁扩其他 chunk；与 tl189/证据包503 **分刀**；C 刀面不主开。

## 改动（F5 族 → 代码点）
| # | 改什么 |
|---|---|
| **F5⁵ A 相位钉死** | setup：`_f5ResumeLockGen`；`ur` 尾若 phase∈{CARD,OPENING,REVIEW} 钉 `generation`；`xe` watch：同 gen 且 PENDING* 被打回 SELECT → **强制 CARD** + 旁注「继续领用相位被打断…」 |
| **F5⁵ B 空窗持续门** | `__f5EmptyWindowGate`：record 真且 state∈PENDING* 且 (phase≡SELECT 或 stepIndex≡0) → 必写 te+error；`ur` 尾 + 持续 watch 双触发 |
| F5′″‴/F5quara | **保留加深，不删** |
| 合法 reset | `o.reset()` bump generation → 锁自动失效；不阻断 startAnother 等 |

## 自测
`SELFTEST.md`（前枪 13 + F5⁵×6 = 19 例 PASS）。**静态 ≠ 公网 PASS。**

## 红线
未 LIVE；未写库；案1 未碰；无密钥；挂上≠PASS；**尚无放行章**；禁复挂 6d70a485；开刷硬门槛 E 维持。
