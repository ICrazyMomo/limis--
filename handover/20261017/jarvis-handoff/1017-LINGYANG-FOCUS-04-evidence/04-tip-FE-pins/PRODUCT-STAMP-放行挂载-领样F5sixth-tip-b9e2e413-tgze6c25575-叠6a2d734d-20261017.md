# 产品放行挂载：领样 F5⁶ tip · `b9e2e413` · tgz `e6c25575`
状态：已生效（**可 LIVE · 串行硬门**；挂上≠PASS）
时刻：2026-10-17 08:12 Asia/Shanghai
叠：准修 `6a2d734d` · DIAG `18fd5c5b` · RD-VERIFY PASS `26c05878` · FAIL裁 `ddaea021`

## 产品抽核
| 项 | 结果 |
|---|---|
| tip 短sha | **`b9e2e413`** |
| tgz | **`e6c25575931cd38c`** ≡ 本机复算 |
| FE ORIG→NEW | **`50ea6b9f`→`9b695797`**（本机复算 MATCH） |
| 分支 / tag / FINAL观察 | `tip/lingyang-fe-f5sixth-on-7080b882-20261017` · `tip/b9e2e413-on-7080b882` · `7080b882`（FE-only，不改 jar） |
| 刀面 | **A2** 锁绑 recordId（禁唯 gen）+ **B2** 空窗盖 reset/te后清（+immediate）；旧 F5′″‴/quara/F5⁵ 保留；**C 未主开** |
| 覆写 | **仅** `LabSampleHandoverPanel-B5RJ_HtO.js`；B3030/NJVZXfJd/requestId/jszip **不**覆写 |
| SELFTEST | 26（13+6+7）静态 PASS ≠ 公网 |
| 禁复挂 | **`46664856`** / **`6d70a485`** |
| 旁注 | 包外旧 sidecar `cefe7517` **作废**；以实算 `e6c25575` 为准 |

## 放行对象（运维须对盘）
| 项 | 值 |
|---|---|
| 目录 | `/workspace/artifacts/deliver-tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017/` |
| tgz | `tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017.tgz` · sha16=`e6c25575` |
| 挂后 FE | ≡ **`9b695797`** |
| 挂前 FE ORIG | ≡ **`50ea6b9f`**（≠停） |

## 挂前硬门（缺一停挂回产品）
1. **串行**：查看录入乙 tip`0a6ac4d9` 开刷窗（测3·`e5e3362f`）**收窗**（RESULTS 交齐或测口书面收）后，才挂本 tip；**禁与乙测3同窗双挂**
2. 现网 LabSampleHandoverPanel ≡ ORIG `50ea6b9f`（≠停）
3. tgz ≡ `e6c25575`；挂后 ≡ `9b695797`；**禁**复挂 `46664856`/`6d70a485`
4. 只覆写清单 1 文件；禁扩 Core / index-B3030 等共享入口
5. 挂前 `ops-mount-preflight.sh`；案1不动；禁自 LIVE
6. Core jar 本票不改（现盘若漂至 `b4eedcf1` 等 **不挡** 本 FE tip）

## 令
| 谁 | 令 |
|---|---|
| **运维** | 乙测窗收后 **串行** LIVE 本 tip → 交 AFTER（ORIG→NEW） |
| **测3** | 领样线继续 **HOLD** 至本 tip LIVE AFTER + **开刷章**（硬门槛 E：Vue `phase/record.id/state/error/te` + Network verification×view-sessions 成对）；夹具维持甲73 |
| **研发** | 禁自 LIVE；禁复挂旧 tip |

## 盖了 / 没盖
- **盖了**：采信 RD-VERIFY PASS`26c05878`；本 F5⁶ FE tip **放行挂载**（串行）
- **没盖**：开刷；PASS；C 主钉；同窗立刻挂

红线：案1不动；挂上≠PASS；无开刷章禁开跑；查清楚再修；与乙/双审 **另线**。
