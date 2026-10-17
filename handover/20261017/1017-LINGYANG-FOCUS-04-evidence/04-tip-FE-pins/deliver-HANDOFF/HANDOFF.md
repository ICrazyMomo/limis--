# HANDOFF · 领样 F5⁶ FE tip（中文义：A2 锁绑 recordId + B2 空窗盖 reset/te后清）· 2026-10-17
> **叠章**：准修 `6a2d734d`（A2+B2；旧准修 `57945808` A+B gen 锁溯源保留加深；废「仅 gen 锁即可收口」）· 采信 DIAG `18fd5c5b` · 基线 tip `46664856`/LIVE FE `50ea6b9fd94fcec1`
> **追溯**：分支 `tip/lingyang-fe-f5sixth-on-7080b882-20261017` · 短sha `b9e2e413` · 叠基 FINAL `7080b882` · tag `tip/b9e2e413-on-7080b882`（本地已打，未推）

## ① 产物在不在（路径+sha）
| 产物 | 路径 | sha256 / sha16 | 在？ |
|---|---|---|---|
| 交件目录 | `/workspace/artifacts/deliver-tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017/` | — | 在 |
| tgz | `tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017.tgz` | sha16 见包外 `SHA16-TGZ.txt`（包外为准） | 在 |
| FE NEW | `dist/assets/LabSampleHandoverPanel-B5RJ_HtO.js` | `9b6957978955d5092560df023b16ac4b4a8106939282456fb1095caf25a9e7be` · sha16 `9b6957978955d509` | 在 |
| FE ORIG（=现网 LIVE / tip 46664856 NEW） | `orig/LabSampleHandoverPanel-B5RJ_HtO.js` | `50ea6b9fd94fcec190d6e0bd778232645a07c9d78368873f50a3c8903fe822b8` · sha16 `50ea6b9fd94fcec1` | 在 |

## ② 放行章
**尚无放行章**。禁自 LIVE；交件后停。路径：RD-VERIFY → 产品另盖放行 → 运维 LIVE → 测侧重刷（硬门槛 E：RESULTS 必贴 Vue phase/record.id/state/error/te + Network verification 与 view-sessions 是否发出）。

## 挂前实测认（HANDOFF 必写）
| 项 | 值 | 出处 |
|---|---|---|
| 现网 Handover FE | **`50ea6b9fd94fcec1`**（≡ tip 46664856 NEW） | DIAG `18fd5c5b`；Handover MATCH |
| Core FINAL 观察 | **`7080b882`**（jar sha16；FE-only 不改） | OPS-LIVE 领样 F5prime/F5quara/F5fifth 记 CORE=7080b882 |
| 本票 ORIG 闸 | 挂前必须 ≡ `50ea6b9fd94fcec1…`；≠则停 | 本包 `orig/` |
| 共享入口 B3030 | **不覆写** | 全量覆写清单 |

## 基座说明
- FINAL 按令认 **`7080b882`**（现网 Core jar 观察钉）；本包 **仅 FE**，不触 jar。
- FE 门禁 ORIG=**`50ea6b9fd94fcec1`**（已核 ≡ 前枪 tip 46664856 NEW / 现网 LIVE）；≠则停。
- 做法：在 LIVE chunk（46664856 NEW）pretty 上加深 A2+B2 → esbuild 压缩 → 同名覆写。可读源：`src/patched-pretty.js`。
- **禁复挂** tip `46664856` / `6d70a485`；**禁覆盖**旧 f5fifth/f5quad/edde tgz。

## 禁并项声明
未合入 ρ/f95/AME/SoD/WorkspaceAccess/④；未改 Core/jar；未灌 C1–C3；未碰案1 QC-900421；无密钥进件；禁扩其他 chunk；与 tl189/证据包503 **分刀**；**C 刀面不主开**（admission→reset 若证再勾；本票旁注）。

## 刀面 A2+B2 对照表
| # | 改什么 | 相对 F5⁵ |
|---|---|---|
| **A2 锁绑 recordId** | setup：`_f5ResumeLockRecordId`（旁路纯 `_f5ResumeLockGen === generation`）；`ur` 尾进入 CARD/OPENING/REVIEW **或** record PENDING* → 钉 `record.id`；打回 SELECT 仍强制 CARD；reset 清 record 后仍持锁 → **必黄文「相位被打断」** | 废「仅 gen 锁即可收口」；reset→gen+1 **不再**使锁失效 |
| **B2 空窗盖 reset/te后清** | `__f5EmptyWindowGate` 亦覆盖 lock recordId 残存；`te` 一经门写（`_f5EmptyWindowTeArmed`）→ 无关清后 `__f5ReenterEmptyGateAfterTeClear` **立即重入**；A+B `xe` watch 加 `{ immediate: !0 }`；task watcher reset/te 清后同帧重入 | 盖住 F5⁵「CARD 尾跳过 / reset 清 record / te 后清 / 无 immediate」 |
| F5′″‴/F5quara/F5⁵ | **保留加深，不删**（gen 锁路径仍保留作兼容） | — |
| **C** | **未主开** | 旁注 |

## 自测
`SELFTEST.md`（前枪 13+6 + F5⁶×7 = **26** 例 PASS）。**SELFTEST_STATIC_OK ≠ 公网 PASS。**

## 红线
未 LIVE；未写库；案1 未碰；无密钥；挂上≠PASS；**尚无放行章**；禁复挂 46664856/6d70a485；开刷硬门槛 E 维持。
