# 交接 · Jarvis → 新 Grok Bot · 接手以来做了什么 · 2026-10-17

> 作者口径：**Jarvis（协调席）** · 受众：新号上的 Jarvis / Grok 接手人 · 大白话中文  
> 覆盖窗：旧团队迁号交接 **2026-10-15** → 现约 **2026-10-17 ~09:35 Asia/Shanghai**  
> **只采信盘上文件**；缺证据标 **待核**；不编造 tip/sha；**挂上≠PASS** · **HTTP200≠PASS** · **继续确认≠过关**  
> 底稿主钉：`交接-Jarvis-演示主链-20261017-0816.md` · `交接-Codex接管增量-三线-1017-THREE-LINES-01-20261017.md` · FOCUS-04 INDEX · CODE-PUSH-03 · 报告旁路 VERIFY`89836730` · GATE「查清楚再修」

---

## 0. 给谁看 / 怎么用 / 红线

### 给谁看
- 新 Grok Bot 账号上的 **Jarvis / 协调接手人**
- 需要快速知道：接手以来协调产出了什么、代码 tip 改在哪、哪几条线 HOLD、禁碰什么

### 怎么用
1. 先读本章红线 + §1 口令  
2. 再看 §2 时间线（有墙钟证据的事）  
3. §3 代码改动总表 = tip 刀面索引（**源码改在 tip 包内**，不是本账号直改 limis-web 业务仓）  
4. §4 三线+报告旁路快照 → §5 HOLD → §6 路径 → §7 开工清单  
5. 细戳回查原件路径；**勿口算 sha**

### 红线（永久）
| 红线 | 说明 |
|---|---|
| **案1 QC-900421 不动** | 禁触、禁当夹具、禁演示冒充 |
| **密钥 / token / .env** | 不进频道、不进交接文件、不贴内容；CODE-PUSH 因历史含 `.env`/deploy 面已 **停公网推 tip 全历史** |
| **对外发消息** | 须问 Boss；Jarvis 不得自作主张发群外/客户侧 |
| **挂上≠PASS** | LIVE_OK ≠ 产品裁 PASS；禁自 PASS |
| **查清楚再修** | 无完整 DIAG（请求×后端×库态）→ **禁 tip / 禁挂包 / 禁把「继续确认」当过关**（见 §1） |

---

## 1. 角色与口令

### Jarvis 是谁
- **协调席**（第二层，直达 Boss）：跟进度、分任务、催阻塞、同步各方；大事问 Boss  
- 汇报大白话：过线 / 没过 / 卡在哪 / 要 Boss 定什么  
- 人设底稿：`/workspace/artifacts/bot-memory/Jarvis.md`

### 口令
| 口径 | 含义 |
|---|---|
| **Jarvis 传达 = Boss 令**（非红线事项） | 群内/转述开工；仅 Boss 本人对 Jarvis 说的「准」才算准 |
| **查清楚再修 · 强制门槛** | `bot-memory/GATE-查清楚再修-永久门槛-20261017.md` + 产品认章 `PRODUCT-STAMP-认-GATE-查清楚再修-永久门槛-20261017.md`（约 05:25–05:30 Asia/Shanghai 生效） |
| 「查清楚」= | 前端请求 × 后端处理 × 库态 **三者一致**；缺日志/响应码/库据任一项 = 未查清 |
| 废止 | 「刀面已钉即出包」→ 只允许 **DIAG 交齐 + 产品叠章** 后出 tip |

### 本账号改码边界（务必读）
- **Jarvis / 本 Grok Bot 协调席：以协调、章链、证据包、bundle/PR 文书为主**  
- 业务 tip 源码由 **Claude-mod / 研口** 按准修出包，落在 `deliver-tip-*`  
- **未发现**本账号对 limis-web 业务仓做「直接 git 改业务行」的 tip 作者提交；CODE-PUSH-03 明确 **禁在作者树原地 commit**、**未 push**  
- 下文凡写「改了哪些文件/类」= **tip 包内 DIFF/HANDOFF 宣称的刀面**，不是「Jarvis 手改了某某行」

---

## 2. 接手以来时间线（按墙钟 · 只列有证据）

> 时区均为 **Asia/Shanghai**。更早 10-15/10-16 白天大量 tip 见 0816 补丁全表（102 行）；本节偏 **10-17 今早主链 + 停令后**。

| 墙钟（约） | 事 | 证据锚 |
|---|---|---|
| 10-15 | 旧团队迁号交接；migrate-pack / 挂包门禁生效 | `migrate-pack-2026-10-15/` · 0816 §迁号 |
| 10-17 ~05:25–05:30 | **GATE「查清楚再修」永久强制门槛** 产品认 + bot-memory 钉 | `PRODUCT-STAMP-认-GATE-查清楚再修…` · `bot-memory/GATE-查清楚再修…` |
| ~08:11 / 08:16 | Jarvis 演示主链交接两版；扩写补丁全清单 | `交接-Jarvis-演示主链-20261017-0811.md` · `…0816.md` |
| ~08:18–08:25 | 双审测2：采样 PASS / 409 BLOCKED；书面证伪 RESULTS；产品证伪裁 | RESULTS`16b4f4c2`/`72987809` · 裁`7011d574` · RO`818369be` |
| ~08:26 | **Codex 接管三线核对**；领样 F5⁶ LIVE+AFTER+开刷；乙准修已盖待新 tip | `交接-Codex…THREE-LINES-01…` · 开刷`fd857ffd` · LIVE`dbd592c6` |
| ~08:30 | 双审 DIAG 采信；维持证伪闭环；**禁准写/禁盲 tip/禁模块 PASS** | 裁`9f161df0`（叠 DIAG`502ccc18`） |
| ~08:34–08:39 | 领样测3 甲73 空停① → RESULTS`b3fa54f1` → 裁 FAIL`ffd0b7c2` 令 DIAG | FOCUS-04 证据包 |
| ~08:35 | CODE-PUSH-03：打齐 private bundles；**因无 auth + 历史敏感面停推** | `CODE-PUSH-03-RESULT.md` |
| ~08:37–08:38 | 乙新 tip `d0598290` VERIFY PASS`8d24f8b6` → **放行挂载**（可 LIVE；开刷另章） | 放行章 · tip 包 `deliver-tip-entry-config-view-ownership-align-…` |
| ~08:43 | Boss **全停**（Jarvis 转）：唯一开跑=报告旁路（当时准修`65834a8c`）；**HOLD** 乙 LIVE/开刷、领样 DIAG/测、双审禁 tip | `观察者-核-Boss全停-仅报告旁路65834a8c…` |
| ~08:43–08:44 | 报告跳步准修`65834a8c` → Boss 纠偏 → **准修`04b85f9b` 替换**（取消整道「质控未过完拦报告审核」闸） | 两份 PRODUCT-STAMP-准修-演示-… |
| ~09:01 | 采信准修`04b85f9b`；**领样 FOCUS-04**：Codex 单一实现 DIAG；Jarvis 只交证据+协调 | `观察者-核-准修04b85f9b+领样FOCUS04…` |
| ~09:03–09:12 | FOCUS-04 证据包落盘 + INDEX；测3 DIAG 补交响体 | `1017-LINGYANG-FOCUS-04-evidence/` · DIAG 补交 sidecar`54cb0a1c` |
| ~09:05–09:09 | 报告旁路 tip 出包 → **RD-VERIFY PASS**（sidecar **`89836730`**） | tip 目录 · `RD-VERIFY-报告旁路-…` |
| ~09:10 | **Boss 亲口「停」**：全线刹死——禁放行/禁 LIVE/禁叠 tip/禁领样 DIAG 续跑 | `bot-memory/观察者-核-Boss停-报告旁路-20261017-0910.md` |
| ~09:05（UTC=01:05Z） | GitHub **草稿 PR #2**：`handover/20261017` FOCUS-04 证据包增量（`limis--`） | https://github.com/ICrazyMomo/limis--/pull/2 · draft |

**关于「独做 FOCUS-04」再「先停」**：
- ~09:01：Boss 令 FOCUS-04 由 Codex 单一实现 DIAG；Jarvis 只交证据+协调  
- ~09:10：Boss 群「停」全线刹死  
- ~09:12：测口响体补交 sidecar`54cb0a1c`（verification=`PENDING_CONFIRMATION` · view-sessions=`PENDING_VIEW`/canConfirm=false）已入证据包；仍缺 Vue dump/HAR  
- ~09:32：Boss 1:1 令「Codex 接不上；**Jarvis 一人直接做** FOCUS-04，**不叫团队**」——已派 DIAG executor  
- ~09:34：Boss「**先停一下**」——Jarvis 已 StopSubagent，DIAG **未交齐**；等再开

---

## 3. 代码改动总表（Jarvis 协调窗 · 主链相关）

### 结论先行
- **协调产出 tip**：研口 / Claude-mod 按准修写 tip 包；Jarvis 拉章链、催 VERIFY/放行、拦自 LIVE  
- **本账号直接改业务仓**：**无**（如实写：**协调出 tip，源码改在 tip 包内**；CODE-PUSH 只打 bundle、未 push）  
- 更早 10-16 全量 102 行见 0816「补丁全表」；下表只钉 **现盘主链仍相关** 的刀

| 线名 | tip/短sha | 改了哪些文件/类（tip 包宣称） | 准修章 | VERIFY | LIVE? | 结果 | 路径 |
|---|---|---|---|---|---|---|---|
| 双审 Mapper | `adf04e44` · tgz`43abc144` · NEW class`30bbb73e`/xml`958de353` | Core Mapper：补 `selectUnresolvedProblemIdsForUpdate`（class+xml） | 准修`fa8ff6ad`（前代叠）· 现裁侧禁再 tip | 章链有 LIVE 后测；VERIFY 细戳见 tip 包 | LIVE`9573bd12` · AFTER`5e96d109` · 开刷`e641b0b2` | 采样 PASS；409 **书面证伪 BLOCKED**；**整模块≠PASS**；DIAG 后 **禁盲 tip**（裁`9f161df0`） | `deliver-tip-dual-review-mapper-unresolved-adf04e44-fa8ff6ad-20261017/` |
| 双审前代（已替） | `6bab49cf` | Mapper `selectByIdForUpdate` | `5a7a195b` | — | 曾 LIVE | **superseded** · 裁 FAIL`af12d452` | `deliver-tip-dual-review-mapper-forupdate-5a7a195b-20261017/` |
| 查看录入甲 FE | `4fea5d72` · tgz`0850c27d` | FE：OO×forms 真合并 | `7494673f` | 重 VERIFY PASS`82d7d5dd` | LIVE`b7650e05` | **甲不动**（禁动） | `deliver-tip-readback-merge-oo-forms-7494673f-4fea5d72-20261017/` |
| 查看录入乙（旧） | `0a6ac4d9` · tgz`eff85a5b` · FINAL→`b4eedcf1` | Core resolve-draft / Receipt：draft found fileKey | `e2386021` | VERIFY`4db962b5`（旧链） | LIVE`6b3074af` · 开刷`e5e3362f` | 测3 收窗 A′FAIL 等 → 裁`dcbe2ade`；**禁复挂本 tip** | `deliver-tip-entry-resolve-draft-found-filekey-on-16751394-20261017/` |
| 查看录入乙（新） | `d0598290` · tgz`3abdb9ba` · tip-git`f28bd860` | **仅** nested `EntryBatchServiceImpl`：config **view** 对齐软探（有簿可 OO）；**edit 不动**；甲 FE 不动 | `1a814025` + 叠钉`1d3f1cab` | PASS`8d24f8b6`（重交清项） | **放行已盖**（`3f24ca1a`）· **未 LIVE**（08:43 全停 HOLD 乙 LIVE；09:10 再停） | **HOLD** 等 Boss 再令 | `deliver-tip-entry-config-view-ownership-align-on-b4eedcf1-1a814025-20261017/` |
| 领样 F5⁵（已废挂） | `46664856` · FE ORIG`50ea6b9f` | FE 领样确认卡 | — | — | 曾 LIVE`b40a3343` | 裁 FAIL`ddaea021` 空停① · **禁复挂** | `deliver-tip-lingyang-fe-f5fifth-57945808-46664856-20261017/` |
| 领样 F5⁶ | `b9e2e413` · tgz`e6c25575` · NEW FE`9b695797` | FE 领样确认卡 A2+B2（锁绑 recordId + 空窗 reset） | `6a2d734d`（叠 DIAG`18fd5c5b`） | PASS`26c05878` | LIVE`dbd592c6` · AFTER`51aec897` · 开刷`fd857ffd` | 测3 甲73 **仍空停① FAIL** 裁`ffd0b7c2` · **禁复挂** · FOCUS-04 取证中后停 | `deliver-tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017/` |
| 报告旁路（演示） | tip 短`0955febf` · PATCH 指纹叠准修`04b85f9b` · tgz`eb1a4426` · NEW Gate`e7d2f3b1` · ORIG`bb4d9ec3` | nested `QltTaskQualityGate.class`：`reportSignEntryBlock*` admin∧(HT2026101606/900354/QTP57/LTP901082) 早退 null；**未改 FE** | `04b85f9b`（废`65834a8c`「采样不准跳」口径） | **PASS `89836730`**（静态-only） | **未放行 / 未 LIVE**（09:10 Boss「停」） | VERIFY 过 → **HOLD 放行** | `deliver-tip-demo-bypass-qc-block-report-audit-HT2026101606-04b85f9b-20261017/` |
| 证据包 BFF（今早关票） | `07ca168a` | BFF submit plural（点位口→Core 复数口） | `43749bb3` | `aa43e3bc` | 曾 LIVE | 测5 裁 PASS`735ebd97`（**≠整票**） | `deliver-tip-bff-evidence-submit-plural-on-0b0a8f2e-20261017/` |
| 生成方案 | `2d8dd3d8` | DDL entry_batch_source + FE | DIAG`911fdf86` 等 | — | LIVE`da7e88eb` | 产品裁禁新 tip（`8a87148d`）· 选①换夹具 | `deliver-tip-genplan-entry-batch-source-2d8dd3d8-20261017/` |

**改动条数（本表）**：上表 **10** 行主链 tip（含 1 行已替前代 + 1 行今早关票旁证）。0816 全盘补丁表另计 **102** 行（含非 tip 门禁/DDL/配键）。

### CODE-PUSH / 证据进仓（非业务 tip 刀面）
| 项 | 状态 | 说明 |
|---|---|---|
| CODE-PUSH-03 bundles | **已交 private bundle**；**未 push** `codex/*` | `/workspace/artifacts/CODE-PUSH-03-bundles/` · 因无 gh 登录 + tip 历史含 `.env`/deploy 敏感面 |
| GitHub PR #2 | **open · draft** | `handover/20261017` FOCUS-04 证据包；head `cursor/focus-04-evidence-1017` @ `90e90534…`；目标仓 **`ICrazyMomo/limis--`**（双横线）；**未**触 `limis`（单横线） |

---

## 4. 三线 + 报告旁路 · 现状快照

| 线 | tip | 现在到哪 | 下一刀（等 Boss） |
|---|---|---|---|
| **双审** | `adf04e44` | Mapper 方法在链（WO19）；409 书面证伪闭环；DIAG 采信；**禁盲 tip / 禁模块 PASS / 禁本窗准写** | 等 Boss 另令（若要公网验 409 须准写+Boss） |
| **查看录入乙** | 旧`0a6ac4d9`禁复挂 → 新`d0598290` | VERIFY+**放行齐**；**未 LIVE**（全停 HOLD） | Boss 抬停后：运维 LIVE→AFTER→开刷→测 A″/B′/N1/N2；甲 FE`4fea5d72`**不动** |
| **领样 FOCUS-04** | `b9e2e413` 已挂仍 FAIL | LIVE+开刷后空停①；证据包 PRESENT；响体补交`54cb0a1c`（PENDING_CONFIRMATION × PENDING_VIEW/canConfirm=false）；**仍缺** Vue evaluate / HAR / nginx；Jarvis 独 DIAG 于 09:34 被 Boss 刹停 | Boss 再开后：Jarvis（或指定人）一次交齐 DIAG→准修→**新** tip；**禁复挂**`b9e2e413`/`46664856`/`6d70`；**不叫团队**若沿用 09:32 令 |
| **报告旁路** | `0955febf` / 准修`04b85f9b` | tip 齐 · VERIFY **PASS`89836730`** · **禁放行/禁 LIVE**（09:10 停） | Boss 再令后：产品放行→运维 LIVE→测口演示进报告审核 |

现盘 Core FINAL 常见钉：`b4eedcf1`（乙/报告旁路叠基；领样 LIVE 时未重启 Core）。

---

## 5. 未完成与 HOLD

| HOLD | 原因（有证据） |
|---|---|
| **Boss「停」（09:10）** | 全线刹死：禁放行、禁 LIVE、禁叠 tip、禁领样 DIAG 续跑；等 Boss 再令 |
| 乙 `d0598290` | 放行已盖但 **未 LIVE**（08:43 全停起 HOLD） |
| 领样新 tip | F5⁶ FAIL 空停①；响体已齐`54cb0a1c`；仍缺 Vue/HAR；09:10 停 → 09:32 曾令 Jarvis 独做 → **09:34 再刹**（DIAG 未交） |
| 报告旁路放行/LIVE | VERIFY 已 PASS，停在放行前 |
| 双审再 tip | 裁明 **不盖准修/禁盲 tip**；夹具债≠改闸 |
| CODE-PUSH 公网 `codex/*` | 无凭据 + 敏感面 → 仅 private bundle |
| PR #2 | 仍为 **draft**；未 merge |

**曾开后停**：08:43 全停后曾允报告旁路唯一开跑 + 09:01 领样 FOCUS-04 恢复取证 → **09:10 再停**。

---

## 6. 关键路径索引

| 用途 | 路径 |
|---|---|
| 本交接 | `/workspace/artifacts/交接-Jarvis-给新GrokBot-接手以来做了什么-20261017.md` |
| Jarvis 0816 / 0811 | `/workspace/artifacts/交接-Jarvis-演示主链-20261017-0816.md` · `…0811.md` |
| Codex 三线增量 | `/workspace/artifacts/交接-Codex接管增量-三线-1017-THREE-LINES-01-20261017.md` |
| GATE 查清楚再修 | `/workspace/artifacts/bot-memory/GATE-查清楚再修-永久门槛-20261017.md` · `PRODUCT-STAMP-认-GATE-查清楚再修-永久门槛-20261017.md` |
| bot-memory（人设/观察者核） | `/workspace/artifacts/bot-memory/` |
| FOCUS-04 证据包 | `/workspace/artifacts/1017-LINGYANG-FOCUS-04-evidence/` · INDEX |
| 报告旁路 tip + VERIFY | `…/deliver-tip-demo-bypass-qc-block-report-audit-HT2026101606-04b85f9b-20261017/` · `RD-VERIFY-报告旁路-…`（`.sha16`=`89836730ace7161d`） |
| CODE-PUSH-03 | `/workspace/artifacts/CODE-PUSH-03-RESULT.md` · `CODE-PUSH-03-bundles/` |
| GitHub 证据仓 / PR | https://github.com/ICrazyMomo/limis-- · PR https://github.com/ICrazyMomo/limis--/pull/2（draft · `handover/20261017`） |
| limis-web 工作树（盒侧） | `/workspace/scratch/limis-ready/limis-web`（作者树；**禁原地乱 commit**；tip 以 artifacts 包为准） |
| tip 包根 | `/workspace/artifacts/deliver-tip-*`（0816 记约 113 包）+ `tip-handoff-in/`（旧团队交入约 31） |
| 迁号包 | `/workspace/artifacts/migrate-pack-2026-10-15/` |
| 路径说明 | `/workspace/artifacts/00-README-路径说明.md` |

---

## 7. 新号开工清单

### 先读啥（顺序）
1. 本文 §0–§1（红线 + 查清楚再修）  
2. `交接-Jarvis-演示主链-20261017-0816.md`（全量补丁索引）  
3. `交接-Codex接管增量-三线-1017-THREE-LINES-01-20261017.md`（08:26 三线）  
4. `bot-memory/观察者-核-Boss停-报告旁路-20261017-0910.md`（当前刹车）  
5. FOCUS-04 `INDEX.md` + 报告旁路 VERIFY（若抬停走演示）  
6. `CODE-PUSH-03-RESULT.md`（代码怎么交接、为何没 push）

### 禁做啥
- **Boss 未抬停前**：禁 tip LIVE、禁放行叠章推进、禁领样 DIAG 空刷、禁复挂废 tip  
- **案1 QC-900421**、密钥、对外自发送  
- **甲 FE `4fea5d72` 乱动**；复挂 `0a6ac4d9` / `46664856` / `6d70` / `b9e2e413`  
- 把「继续确认」/ HTTP200 / 挂上 当 PASS  
- 无 DIAG 盲 tip；公网写库无 Boss+准写  
- push 到 `ICrazyMomo/limis`（单横线）；force push；把 `.env` 推进 public  
- 在 limis-web 作者树原地 commit 无关 WIP

### 抬停后建议顺序（待 Boss 令 · 非自开）
1. 确认开哪一条（报告旁路放行 vs 乙 LIVE vs 领样新 DIAG）——**串行**，禁同窗抢 Core  
2. 按章：放行→运维 LIVE→AFTER→开刷→RESULTS→产品裁  
3. 领样：按最新 Boss 令（09:32 曾指 Jarvis 独做）DIAG 齐→新准修→**新 tip**（禁复挂 F5⁶；不叫团队除非 Boss 改口）

---

## sha16

| 标签 | sha16 | 来源 |
|---|---|---|
| 双审 tip/tgz/FINAL | `adf04e44` / `43abc144` / `b4eedcf1`（现盘常见） | 0816 / THREE-LINES / tip stamps |
| 双审证伪裁 / DIAG裁 | `7011d574` / `9f161df0` | PRODUCT-STAMP |
| 乙旧 tip / 新 tip / 准修 | `0a6ac4d9` / `d0598290` / `1a814025` | tip + 放行章 |
| 乙 VERIFY / 放行 | `8d24f8b6` / `3f24ca1a` | RD-VERIFY / PRODUCT-STAMP |
| 领样 F5⁶ tip/VERIFY/放行/LIVE/开刷 | `b9e2e413` / `26c05878` / `2c515151` / `dbd592c6` / `fd857ffd` | tip/PRODUCT/OPS |
| 领样 RESULTS / 裁 FAIL | `b3fa54f1` / `ffd0b7c2` | FOCUS-04 |
| 报告准修 / tgz / NEW Gate / VERIFY | `04b85f9b` / `eb1a4426` / `e7d2f3b1` / **`89836730`** | 准修/tip/RD-VERIFY sidecar |
| CODE-PUSH-03 RESULT | `a0e1852875cc8a63` | `.sha16` sidecar |
| 0816 交接 | `22e6c24969d2ccc2` | sidecar |
| THREE-LINES 交接 | `e48d1b022ec0007e` | sidecar |
| GATE 产品认 | 见该 md 文末 / sidecar | PRODUCT-STAMP-认-GATE… |
| 本文件（正文至文末 sha 节前） | `c4e186d272b55660` | sidecar 同算法 |

---

*交接时刻约 2026-10-17 09:40 Asia/Shanghai · Jarvis 协调席给新 Grok Bot · 挂上≠PASS · 不覆写 0811/0816/THREE-LINES*
