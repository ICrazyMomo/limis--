# RD-VERIFY · 领样 F5⁶ FE tip `b9e2e413` · tgz `e6c25575` · 叠准修 `6a2d734d` · 2026-10-17

**RD-VERIFY: PASS**

> 角色：limis-研发执行器 · **静态核**（禁 LIVE / 禁挂 / 禁案1 / 禁写库 / 禁改交件字节）· Asia/Shanghai  
> 核包时刻：2026-10-17 08:11 Asia/Shanghai（盒钟 UTC+8）  
> 交件：`/workspace/artifacts/deliver-tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017/`  
> tgz：`tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017.tgz` · 实算 sha16=`e6c25575931cd38c`（包外旧 sidecar `cefe7517…` **过期作废**，以实算为准）  
> 准修章：`PRODUCT-STAMP-准修-领样空停①-F5sixth-A2锁绑recordId+B2空窗盖reset-叠DIAG18fd5c5b-20261017.md` sha16=`6a2d734daaa4b8c7`  
> DIAG：`DIAG-研发-领样-F5fifth-46664856-空停①确认卡未挂-叠ddaea021-20261017.md` sha16=`18fd5c5bce2ae293`  
> **尚无本 tip 放行章**；禁自 LIVE；静态 ≠ 公网 PASS。  
> **FE-only 注明**：HANDOFF Core FINAL 观察写 `7080b882`；本票不改 jar。现网 Core 若已漂 `b4eedcf1`（乙 LIVE）**不因之判 FAIL**。挂前运维须用现盘 FE ORIG `50ea6b9f…` 核对；Core jar 本票不改。

## 结论摘要

| 项 | 值 |
|---|---|
| 总评 | **PASS**（8/8 必核） |
| tip 短sha | `b9e2e413`（全 `b9e2e41374aeda4957d5b37e70879ce4c81c5724`） |
| 分支 | `tip/lingyang-fe-f5sixth-on-7080b882-20261017` |
| 叠基 FINAL | `7080b882`（观察钉；FE-only） |
| tag | `tip/b9e2e413-on-7080b882`（本地已打，未推） |
| tgz sha16 | `e6c25575931cd38c`（≡ 包内 SHA16-TGZ.txt / TGZ.sha256 / 包外+包内 tgz 实算；**≠** 过期 `cefe7517`） |
| ORIG → NEW | `50ea6b9f` → `9b695797`（NEW≠ORIG；size 65002→65780） |
| 覆写文件数 | **1**（仅 `LabSampleHandoverPanel-B5RJ_HtO.js`） |
| 共享入口声明 | **是**（B3030 / NJVZXfJd / requestId / jszip **逐一否**） |
| 准修 / DIAG | `6a2d734d` / `18fd5c5b` |
| 禁复挂 | `46664856` / `6d70a485`（HANDOFF/OPS/准修/ROLLBACK 明示） |
| 含 jar / Core 改动 | **否** |
| 放行章 | **尚无**；禁自 LIVE |
| 可求产品放行 | **是**（另盖放行后方可运维 LIVE；开刷硬门槛 E） |

## 必核逐条

### 1. 可追溯：分支+短sha+叠基 FINAL+tag 与 HANDOFF 一致；禁复挂 46664856/6d70a485 — **PASS**
对照 GATE「tip可追溯-分支短sha叠基tag」与交件：

| 键 | HANDOFF / GIT-TRACE | 本地 git（worktree） |
|---|---|---|
| 分支 | `tip/lingyang-fe-f5sixth-on-7080b882-20261017` | ≡ HEAD 分支 |
| 短sha | `b9e2e413` | `b9e2e41374aeda49…` |
| 叠基 FINAL | `7080b882`（Core jar 观察钉；FE-only） | 声明一致 |
| tag | `tip/b9e2e413-on-7080b882` | `describe --tags --exact-match` ≡ |

父提交=`46664856`（F5⁵；**禁复挂**该 tip 与 `6d70a485`）。path_in_repo=`deploy/fe-tips/lingyang-fe-f5sixth/`；tip-git NEW ≡ 交件 NEW（`cmp` OK）。叠基 FINAL+tag 与 HANDOFF/GIT-TRACE 一致。

### 2. 全量覆写清单齐；共享入口漏列=FAIL — **PASS**
对照 GATE「tip全量覆写清单-含共享入口-漏报作废」：

| # | 文件 | 动作 | PRE | NEW |
|---|---|---|---|---|
| 1 | `LabSampleHandoverPanel-B5RJ_HtO.js` | 同名覆写 | `50ea6b9f` | `9b695797` |

**本次覆写总数 = 1。** `find dist -type f` 恰 1 行；tgz 内 dist 亦恰该 1 文件。

共享入口 / 共用 chunk（清单**逐一声明不覆写**）：
- `index-B3030jDs.js` → **否**
- `index-NJVZXfJd.js` → **否**
- `requestId-Dle7j20r.js` → **否**
- `jszip.min-Bx6_DnlJ.js` → **否**
- 其它 `*.js`/`*.css`/`index.html` → **否**

无未声明部署字节；无 jar/class 带出。

### 3. 复算 tgz/NEW/ORIG/准修/DIAG sha16 ≡ HANDOFF；`sha256sum -c SHA256SUMS` — **PASS**
对照 GATE「出包sha自检与HANDOFF」：

| 产物 | 实算 sha16（全长前16） | 交件声明 |
|---|---|---|
| tgz | `e6c25575931cd38c` | SHA16-TGZ.txt / TGZ.sha256 / 用户期望 `e6c25575…` ≡；包外 `SHA16-TGZ-*.txt` 仍写 `cefe7517` → **过期作废** |
| FE NEW | `9b6957978955d509` | HANDOFF / SHA16.txt / 清单 ≡ |
| FE ORIG | `50ea6b9fd94fcec1` | HANDOFF / SHA16.txt ≡（= 现网 LIVE / tip `46664856` NEW） |
| 准修章 | `6a2d734daaa4b8c7` | SHA16.txt STAMP ≡；sidecar ≡（整文件，无 `## sha16` 节） |
| DIAG | `18fd5c5bce2ae293` | SHA16.txt / sidecar / 文内声明 ≡；OPS-NOTE 原样 `rfind(## sha16)` 因正文尾多 1 空行得 `0b21849c`，**剥末 `\n` 后 ≡ sidecar**（本票叠钉采信声明值；非本 tip 改 DIAG） |

`sha256sum -c SHA256SUMS`：包内所列文件 **全部 OK**。tgz 内 dist NEW / orig ORIG 与包目录同字节。NEW≠ORIG。包外 tgz ≡ 包内 tgz。

### 4. 刀面 A2：锁绑 recordId（非唯 gen）；reset→gen+1 后锁仍效；清 record 后仍持锁 → 必黄文「相位被打断」 — **PASS**
证据（`DIFF-fe-chunk-pretty.patch` / `src/patched-pretty.js` / NEW minify unescape）：

- pretty：`_f5ResumeLockRecordId`（base=0 → patched=6）；`ur` 尾进入 CARD/OPENING/REVIEW **或** record PENDING* → 钉 `record.id`；`__f5PhaseLockOnSelect`：`_lockedByRid` 旁路纯 gen；同 PENDING*+id 匹配 → 强制 `phase="CARD"` +「继续领用相位被打断，已重新进入确认卡…」；**A2b**：`_lockedByRid` 且 record 空/id 不匹配 → 必黄文「继续领用相位被打断，请重新点「继续本次领用」…」
- NEW 实算（unescape）：
  - 锁仍效路径：`C=!!S;…(p||String(r.record.id)===String(S)){r.phase="CARD";…相位被打断，已重新进入确认卡…`
  - 清 record 黄文：`C&&(!r.record||…!==String(S)){…相位被打断，请重新点「继续本次领用」…`
  - 「相位被打断」occ NEW=2 vs ORIG=1（增量 1=A2b 新文案）；「请重新点「继续本次领用」」ORIG=0 → NEW=1
- 废「仅 gen 锁即可收口」：`_lockedByGen \|\| id===lockRid`；reset bump gen 不再使 `_lockedByRid` 失效

### 5. 刀面 B2：空窗门覆盖 reset/lock 残存；te 后清立即重入；watch `immediate:!0` — **PASS**
- pretty：`__f5EmptyWindowGate` 亦覆盖 `_lockedWd=!!_f5ResumeLockRecordId`（reset 清 record 后禁静默 SELECT）；`_f5EmptyWindowTeArmed` + `__f5ReenterEmptyGateAfterTeClear`（te 被无关清后立即重入 p+S）；A+B `xe` watch 加 `{ immediate: !0 }`；task watcher reset/te 清后同帧 `__f5PhaseLockOnSelect(); __f5EmptyWindowGate()`
- NEW 实算：
  - `immediate:!0` occ NEW=2 vs ORIG=1（增量=本刀 A+B watch）
  - te 重入 minify：`function Z(){f&&!T.value&&(R(),N())}`（R=相位锁，N=空窗门）
  - 门覆盖 lock 残存：pretty `_lockedWd` + `_pendingRec` 双谓词；与准修 `6a2d734d` B2 面一致
- 非「仅 sr/ur 尾一次」；挂载首帧必检（immediate）

### 6. 旧 F5′″‴/F5quara/F5⁵ 保留加深不删；C 未主开 — **PASS**
- pretty tip 戳链：`TIP_LINGYANG_FE_F5PRIME_9d43c4b0` + `…F5QUAD_57642542` + `…F5FIFTH_57945808` **保留**，并追加 `…F5SIXTH_6a2d734d`
- NEW unescape 仍含：F5‴「流转卡指纹尚未齐备」；F5quara「继续领用后相位未落确认卡…」（occ=3≡ORIG）；F5⁵「相位被打断，已重新进入确认卡」；gen 锁 `_f5ResumeLockGen` 路径保留作兼容
- **C 未主开**：无 `__f5CutAdmissionReset` / `F5SIXTH_C`；admission `x()` 仍在（未切）；HANDOFF/BRIEF/DIFF 明示 C 旁注若证再勾
- SELFTEST：前枪 13+6 + F5⁶×7 = **26**；raw 末 `SELFTEST_F5QUAD_OK 13` + `SELFTEST_F5FIFTH_OK 6` + `SELFTEST_F5SIXTH_OK 7`

### 7. 禁扩 Core；无 jar/class；分刀 tl189/证据包；SELFTEST 26（13+6+7）在但静态≠公网 PASS — **PASS**
- tgz/`find`：无 `.jar`/`.class`；BRIEF/HANDOFF/OPS：**仅 FE**；Core FINAL 观察 `7080b882` 不改
- 明示与 **tl189 / 证据包503 分刀**；未并 ρ/f95/AME/SoD/WorkspaceAccess；禁灌 C1–C3；C 刀面不主开
- `SELFTEST.md` + `selftest/SELFTEST.raw.txt` 在；明确「**禁 LIVE；SELFTEST_STATIC_OK ≠ 公网 PASS**」
- 本核为静态盒内核对；**未**宣称公网/挂后 PASS

### 8. 尚无放行章；未自 LIVE — **PASS**
- HANDOFF §②：**尚无放行章**。禁自 LIVE；路径 RD-VERIFY → 产品另盖放行 → 运维 LIVE
- 包内 stamps 仅准修 + DIAG；artifacts 无 `放行*b9e2e413*` / `放行*f5sixth*` / `放行*6a2d734d*`
- OPS-MOUNT：「**本包不停运维；须另盖放行章后由运维 LIVE**。研发禁自 LIVE。」
- 本执行器过程：**未 LIVE、未挂、未写库、未碰案1、未改交件字节**

## 禁项核对（本核过程）

| 禁 | 本执行器 |
|---|---|
| LIVE / 挂载 | **未做** |
| 复挂 `46664856` / `6d70a485` | **未做**（且交件明示禁） |
| 写库 / 案1 | **未碰** |
| 改交付包字节 | **未改**（只读） |
| 扩 Core / 覆写 B3030 等 | **无**（清单否；dist 仅 1 文件） |
| 自作放行 | **未做** |

## HANDOFF（VERIFY 通过后）

- **可求产品放行挂载章；禁自 LIVE。**
- 本 VERIFY ≠ 放行章 ≠ 公网 PASS。
- 挂前闸：现网 Handover sha16 ≡ ORIG `50ea6b9f…`（≠则停）；**禁复挂** tip `46664856`/`6d70a485`；B3030/NJVZXfJd/requestId/jszip 未漂；**FE ORIG 闸=50ea6b9f；Core jar 本票不改**（观察钉仍写 `7080b882`；现盘 Core 若漂须运维另认，不挡本 FE tip）。
- 挂后核：Handover ≡ NEW `9b695797…`。
- 开刷须另盖开刷章；硬门槛 E：RESULTS 必贴 Vue `phase/record.id/state/error/te` + Network verification×view-sessions。

## 证据锚点（抽核）

- tgz sha256 前16 = `e6c25575931cd38c`（全 `e6c25575931cd38c8187a167d63972f3ddfa1cb94cd43f9950b7377225b668ba`）
- NEW full = `9b6957978955d5092560df023b16ac4b4a8106939282456fb1095caf25a9e7be`
- ORIG full = `50ea6b9fd94fcec190d6e0bd778232645a07c9d78368873f50a3c8903fe822b8`
- git：`b9e2e413` @ `tip/lingyang-fe-f5sixth-on-7080b882-20261017` tag `tip/b9e2e413-on-7080b882`
- NEW unescape 刀面 A2 旁注：「相位被打断」×2（含 A2b「请重新点「继续本次领用」」）；刀面 B2：`immediate:!0`×2（ORIG×1）+ te 重入 `Z()` + gate 盖 `_lockedWd`
## sha16
26c05878b28d25af
