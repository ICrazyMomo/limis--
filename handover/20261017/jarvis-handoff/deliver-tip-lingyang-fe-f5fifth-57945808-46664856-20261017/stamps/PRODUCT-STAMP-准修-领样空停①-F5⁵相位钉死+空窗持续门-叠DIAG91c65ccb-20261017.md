# 产品准修：领样空停① · **A 相位钉死 + B 空窗持续门** · 叠 DIAG `91c65ccb`
状态：已生效 · **解 tip 闸（须新 tip，禁复挂 `6d70a485`）**
时刻：2026-10-17 07:28 Asia/Shanghai
DIAG：`DIAG-研发-领样-F5quad-6d70a485-空停①确认卡未挂-叠4b60ef6b-20261017.md` sha16=`91c65ccbc6abed40`
叠：FAIL裁 `4b60ef6b` · RESULTS `2816c938` · Handover MATCH `1e4ad9ac`（FE≡`3b7a8a6a`）· 旧准修 F5quara `57642542` · 开刷 `227f2eee`

## 采信 DIAG
1. tip `6d70a485` **已挂**（MATCH）；**非未挂**。
2. 甲73 继续→ verification **200** `PENDING_CONFIRMATION` + view-sessions **200** `PENDING_VIEW`/`canConfirm=false` 后仍停步①、**无确认卡、无黄文** —— **同根加深**（edde0577）。
3. F5quara 无黄文主假说 E1：`sr` 尾 phase 非 SELECT → 跳过兜底 → 随后打回 SELECT 清 `te`；**一次性尾检不够**。
4. `canConfirm=false`＝开会话正常，**非本 FAIL 根因**；禁再查 chunk 未挂。

## 准修面
| # | 面 | 验收（真点甲73） |
|---|---|---|
| **A. F5⁵ 相位钉死** | resume 进入 CARD/OPENING 后，**禁止**无旁注回到 SELECT；若 reset/watcher/generation 失效须 **必**同帧黄文或重入兜底 | 继续后：步③看卡 **或** 同帧黄文；禁「200+步①+无旁注」 |
| **B. 空窗持续门** | 「仅 `sr` 尾一次」改为：`record` 真且 state∈PENDING* 且 `activeStep≡0` 时 **watch/下帧必** `te`+error（或禁止该并存态） | 残留 SELECT+record 亦不能无黄文 |
| **C. 切断竞争** | 父级 emit→watcher reset 竞态 | **若证再勾**；本票不主开，欠运行时可并入 tip 旁注查清 |
| **E. 硬门槛** | RESULTS 必贴 Vue `phase/record.id/state/error/te` + Network verification×view-sessions 成对 | **维持**（`57642542`/`227f2eee`） |
| **D / F / C1–C3** | D 可选同 tip；F 读闸另线；C1–C3 **禁灌** | — |

旧 F5′″‴/F5quara 验收句**仍效**；本票 A+B 加深刀面。

## tip 闸
DIAG 齐 + 本准修 → **准出新 FE tip**（只含 A+B〔+C 若证〕；禁扩 Core/写库）。
- **禁**复挂 / 盲挂 tip `6d70a485`
- **禁**「刀面已钉即出包」空喊；须 RD-VERIFY 证 A+B 字节
- 路径：新 tip→RD-VERIFY→另盖放行→LIVE→开刷（硬门槛 E）
- **禁自 LIVE**；与 tl189 / 证据包503 **分刀**

## 测侧
测3 **HOLD** 至新开刷章；夹具维持甲73 / wd=`71596dda-…` / LTP901082。

## 盖了 / 没盖
- **盖了**：DIAG 采信；准修 A+B；解 tip 闸（新 tip）；禁复挂 6d70；维持 E
- **没盖**：放行；开刷；PASS；C 主钉；灌库；同 tip 再挂

红线：案1不动；查清楚再修；挂上≠PASS；HTTP200≠PASS。
