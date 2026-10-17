# 产品准修：领样空停① · **A2 锁绑 recordId + B2 空窗盖 reset/te后清** · 叠 DIAG `18fd5c5b`
状态：已生效 · **解 tip 闸（须新 tip；禁复挂 `46664856`/`6d70a485`）**
时刻：2026-10-17 08:05 Asia/Shanghai
DIAG：`DIAG-研发-领样-F5fifth-46664856-空停①确认卡未挂-叠ddaea021-20261017.md` sha16=`18fd5c5bce2ae293`
叠：FAIL裁 `ddaea021` · RESULTS `9c0c2082` · 开刷 `2f47cfea` · 叠钉 `a9d4379c` · LIVE `b40a3343` · AFTER `0473b4b5` · 旧准修 A+B `57945808` · FE≡`50ea6b9f`（已挂对）

## 采信 DIAG
1. tip `46664856` **已挂**（FE≡`50ea6b9f` MATCH）；**非未挂 / 非夹具假态 / 非 canConfirm 拦进卡**。
2. 甲73 继续→ verification **200** `PENDING_CONFIRMATION` + view-sessions **200** `PENDING_VIEW`/`canConfirm=false` 后仍停步①、**无确认卡、无黄文/`te`** —— **与 edde/6d70 同根加深**（非新分叉）。
3. F5⁵ A+B 字节在包且 RD-VERIFY PASS ≠ 公网收口：**A** 锁绑 `generation`，`reset`→gen+1 后失配；**B** 在 CARD 族跳过 / reset 清 record / `te` 可后清。API PENDING* ≠ FE 门谓词已真。
4. 欠证（本窗 nginx RO、Vue dump、admission→reset）**标欠非主堵**；不挡本准修。
5. GATE §领样映射已逐项（含不适用明示）——**DIAG 齐，准叠准修**。

## 准修面
| # | 面 | 验收（真点甲73） |
|---|---|---|
| **A2. 锁键改 recordId / 禁唯 gen** | resume 成功（或 verification 200+PENDING*）后，锁钉 `record.id`（或 fingerprint），**不因** `reset`→`generation+1` 失效；打回 SELECT 仍强制 CARD **或** 必黄文 | 继续后：步③看卡 **或**「相位被打断」黄文；禁「200+步①+无旁注」 |
| **B2. 空窗门覆盖 reset / te 后清** | （1）`reset` 后若仍有本人 PENDING* 或刚 resume 的 wd，**禁止**静默 SELECT 无旁注；（2）`te` 一经空窗门写入，禁无关 watcher 无条件抹掉，或抹后 **立即重入门**；（3）A+B watch 加 **immediate** 或挂载后首帧必检 | 残留/打回 SELECT+PENDING* **必**同帧黄文 |
| **C. 切断 admission→reset** | 查清 `x()`/`admission`→父级 watcher→`o.reset()`；resume 临界区禁无感 reset | **若证再勾**；欠运行时可并 tip 旁注查清，**非本票主开** |
| **E. 硬门槛** | RESULTS 必贴 Vue `phase/record.id/state/error/te` + Network verification×view-sessions 成对 | **维持** |
| **D / F / C1–C3** | D 可选同 tip；F 读闸另线；C1–C3 **禁灌** | — |

旧准修 `57945808`（A+B generation 锁/空窗门）**仍效作溯源**；本票 **加深为 A2+B2**，废「仅 gen 锁即可收口」口径。

## tip 闸
DIAG 齐 + 本准修 → **准出新 FE tip**（只含 A2+B2〔+C 若证〕；禁扩 Core/写库）。
- **禁**复挂 / 盲挂 tip `46664856`、`6d70a485`
- **禁**「刀面已钉即出包」；须 RD-VERIFY 证 A2+B2 字节与 SELFTEST（含 reset 后锁仍效、te 后清重入）
- 路径：新 tip→RD-VERIFY→另盖放行→LIVE→开刷（硬门槛 E）
- **禁自 LIVE**；与乙查看录入 / 双审 / tl189 / 证据包 **分刀禁同窗**

## 测侧
测3 **HOLD** 至新开刷章；夹具维持甲73 / wd=`71596dda-6927-41d1-8ec4-3eccb31a75ea` / LTP901213（开刷另钉）。

## 盖了 / 没盖
- **盖了**：DIAG `18fd5c5b` 采信；准修 A2+B2；解 tip 闸（新 tip）；禁复挂 46664856/6d70；维持 E
- **没盖**：放行；开刷；PASS；C 主钉；灌库；同 tip 再挂

红线：案1不动；查清楚再修；挂上≠PASS；HTTP200≠PASS。
