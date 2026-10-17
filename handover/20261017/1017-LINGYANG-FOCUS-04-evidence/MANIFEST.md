# MANIFEST · 1017-LINGYANG-FOCUS-04-evidence

打包时刻：2026-10-17（Asia/Shanghai）· 只读复制 /workspace/artifacts 原件
sha16 算法：整文件 = sha256 前 16 hex；带 `## sha16` 脚的产品/RESULTS 章另列「正文(##sha16前)」（本仓钉法，与 .sha16 sidecar 对齐）。
禁改码 / 禁 tip / 禁 LIVE / 不碰案1/密钥。

## 交齐对照（8 项）

| # | 应交 | 状态 | 路径 / 说明 |
|---|---|---|---|
| 1 | RESULTS 全文 b3fa54f1 | **有** | `01-RESULTS/RESULTS-测3-领样-b9e2e413-甲73-空停①-20261017.md` · 正文/整文件 sha16=`b3fa54f12242a2e2`（sidecar 同） |
| 2 | 产品裁 ffd0b7c2 | **有** | `02-PRODUCT-STAMP/PRODUCT-STAMP-裁-领样F5sixth-b9e2e413-甲73-空停①FAIL-令DIAG-20261017.md` · 正文 sha16=`ffd0b7c2370d9d30`（sidecar 同；整文件因含 sha16 脚而漂） |
| 3 | 截图目录 shots-领样-测3-b9e2e413* | **有** | `03-shots/shots-领样-测3-b9e2e413-甲73-20261017/`（3 图） |
| 4 | tip b9e2e413 / FE 9b695797 HANDOFF·AFTER·LIVE | **有** | `04-tip-FE-pins/`（HANDOFF+OPS-LIVE+OPS-AFTER+放行+开刷+RD-VERIFY；**未**复挂 tip.tgz 二进制，见缺） |
| 5 | Vue phase/record.id/state/error/te 原文 | **有（摘录）** | `05-vue-extract/VUE-五元组-摘自RESULTS-b3fa54f1.md` ← RESULTS 原文；evaluate 被拦无独立 dump |
| 6 | verification×view-sessions 请求/响应 | **部分** | 本枪：RESULTS 内嵌成对 HTTP200（体未读）；旁证窗 RO/RAW 已收；见缺 |
| 7 | 夹具与页面入口 | **有（摘录）** | `07-fixture-entry/夹具与页面入口-摘自RESULTS-b3fa54f1.md`（URL/账号/单号/withdrawal） |
| 8 | 准修/停工边界 | **有** | `08-准修-停工边界/`：领样准修空停① + Boss全停核 + Codex三线交接 + 乙准修1a814025交叉对照；见 `README-准修与停工边界.md` |

## 缺项清单（显式）

- **缺**：本枪（08:34–08:39）专用 nginx RAW / HAR / verification·view-sessions **响应体全文**（RESULTS 写明体未读）
- **缺**：独立 Vue `page.evaluate` / CDP 五元组 dump（本枪 Frame.evaluateExpression 被拦）
- **缺**：tip 包二进制 `tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017.tgz`（本包只收 HANDOFF/LIVE/AFTER 钉面；原件仍在 `/workspace/artifacts/deliver-tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017/` 与根下 mirror；禁 tip 改挂故未展开 dist）
- **缺**：独立 FE chunk 磁盘副本 `LabSampleHandoverPanel-B5RJ_HtO.js`（LIVE/AFTER 已钉 ≡`9b695797`；未另拷二进制）
- **缺**：本枪专用夹具造态 SQL/BEFORE-AFTER 包（入口以 RESULTS 为准）
- **缺**：账号密码/密钥（红线禁收）
- **说明**：`1a814025` 是**查看录入乙**准修，不是领样空停①准修——已作交叉对照收录，勿当领样准修号
- **说明**：`06-verification-view-sessions/` 内测3窗/G1/G2 为**更早旁证窗**（同 withdrawal `71596dda…`），时刻≠本枪 08:34；不得自扩 PASS

## 文件清单（路径 + sha16）

| 相对路径 | sha16 注记 |
|---|---|
| `01-RESULTS/RESULTS-测3-领样-b9e2e413-甲73-空停①-20261017.md` | 整文件=b3fa54f12242a2e2；sidecar=b3fa54f12242a2e2 |
| `01-RESULTS/RESULTS-测3-领样-b9e2e413-甲73-空停①-20261017.md.sha16` | 整文件=f82ff4ba773dfd31 |
| `01-RESULTS/观察者-核-领样RESULTS-b3fa54f1-20261017.md` | 正文(##sha16前)=4aa2f41f3637708a；整文件=65c2fa6e0b4bafd0 |
| `02-PRODUCT-STAMP/PRODUCT-STAMP-裁-领样F5sixth-b9e2e413-甲73-空停①FAIL-令DIAG-20261017.md` | 正文(##sha16前)=ffd0b7c2370d9d30；整文件=639c1679f43bb030；sidecar=ffd0b7c2370d9d30；MATCH |
| `02-PRODUCT-STAMP/PRODUCT-STAMP-裁-领样F5sixth-b9e2e413-甲73-空停①FAIL-令DIAG-20261017.md.sha16` | 整文件=cbd0661752652464 |
| `02-PRODUCT-STAMP/观察者-核-领样裁-ffd0b7c2-20261017.md` | 正文(##sha16前)=a211fcaa06250bb9；整文件=f2a509edc8fd00ba |
| `03-shots/shots-领样-测3-b9e2e413-甲73-20261017/01-点前.jpg` | 整文件=428012470c886baf |
| `03-shots/shots-领样-测3-b9e2e413-甲73-20261017/02-继续后-full.png` | 整文件=5a98ca0ac835345a |
| `03-shots/shots-领样-测3-b9e2e413-甲73-20261017/02-继续后-确认卡或旁注同帧.jpg` | 整文件=2f4884f5ce7c0f69 |
| `04-tip-FE-pins/OPS-AFTER-领样FE-F5sixth-tip-b9e2e413-LIVE后-20261017.md` | 整文件=03470a6b98ce0ec8；sidecar=51aec897c2941e8a |
| `04-tip-FE-pins/OPS-AFTER-领样FE-F5sixth-tip-b9e2e413-LIVE后-20261017.md.sha16` | 整文件=e3a38050090e25ad |
| `04-tip-FE-pins/OPS-LIVE-领样FE-F5sixth-tip-b9e2e413-20261017.md` | 正文(##sha16前)=dbd592c6f3618616；整文件=832c0d2c038bdbfa；sidecar=dbd592c6f3618616；MATCH |
| `04-tip-FE-pins/OPS-LIVE-领样FE-F5sixth-tip-b9e2e413-20261017.md.sha16` | 整文件=3e7d7f37b1d08b9c |
| `04-tip-FE-pins/PRODUCT-STAMP-放行挂载-领样F5sixth-tip-b9e2e413-tgze6c25575-叠6a2d734d-20261017.md` | 整文件=2c51515148dacc6a；sidecar=2c51515148dacc6a |
| `04-tip-FE-pins/PRODUCT-STAMP-放行挂载-领样F5sixth-tip-b9e2e413-tgze6c25575-叠6a2d734d-20261017.md.sha16` | 整文件=d09ba4aa725675ce |
| `04-tip-FE-pins/PRODUCT-STAMP-采信LIVE+开刷-领样F5sixth-b9e2e413-硬门槛E-20261017.md` | 整文件=fd857ffd9d156398；sidecar=fd857ffd9d156398 |
| `04-tip-FE-pins/PRODUCT-STAMP-采信LIVE+开刷-领样F5sixth-b9e2e413-硬门槛E-20261017.md.sha16` | 整文件=1ec9c6db595ff64a |
| `04-tip-FE-pins/RD-VERIFY-领样F5sixth-tip-b9e2e413-tgze6c25575-叠6a2d734d-20261017.md` | 正文(##sha16前)=26c05878b28d25af；整文件=1a47394056c3b69f；sidecar=26c05878b28d25af；MATCH |
| `04-tip-FE-pins/RD-VERIFY-领样F5sixth-tip-b9e2e413-tgze6c25575-叠6a2d734d-20261017.md.sha16` | 整文件=738cd1215dd64f83 |
| `04-tip-FE-pins/deliver-HANDOFF/BRIEF.md` | 整文件=53dc2b5ef4fff653 |
| `04-tip-FE-pins/deliver-HANDOFF/GIT-TRACE.txt` | 整文件=d41ea363a1233101 |
| `04-tip-FE-pins/deliver-HANDOFF/HANDOFF.md` | 整文件=4ed6e08681be28ea |
| `04-tip-FE-pins/deliver-HANDOFF/OPS-MOUNT.md` | 整文件=cd706b707874e658 |
| `04-tip-FE-pins/deliver-HANDOFF/SHA16-TGZ.txt` | 整文件=263bda1dde4964ca |
| `04-tip-FE-pins/deliver-HANDOFF/SHA16.txt` | 整文件=22185111221dcfe7 |
| `04-tip-FE-pins/deliver-HANDOFF/全量覆写清单.md` | 整文件=c033495e6e952fb8 |
| `05-vue-extract/VUE-五元组-摘自RESULTS-b3fa54f1.md` | 整文件=1bdc0fbb2c072aff |
| `06-verification-view-sessions/OPS-RAW-领样-G1-nginx-verification-view-sessions-20261017.txt` | 整文件=29ab77f079a0a802 |
| `06-verification-view-sessions/OPS-RAW-领样-测3窗-CARD_VIEW_SESSION-20261017.txt` | 整文件=c8ade7d35eeca03b |
| `06-verification-view-sessions/OPS-RAW-领样-测3窗-nginx-verification-view-sessions-20261017.txt` | 整文件=9bf9f83ace47f8a2 |
| `06-verification-view-sessions/OPS-RO-领样-G1-verification-view-sessions-71596dda-a476db3f-20261017.md` | 整文件=3b01dd859772258d |
| `06-verification-view-sessions/OPS-RO-领样-G2-verification-view-sessions-响应全文-20261017.md` | 整文件=9f4d5435ed82b9b4；sidecar=9f4d5435ed82b9b4 |
| `06-verification-view-sessions/OPS-RO-领样-G2-verification-view-sessions-响应全文-20261017.md.sha16` | 整文件=fe06a45905652ec6 |
| `06-verification-view-sessions/OPS-RO-领样-测3窗-甲73-verification-view-sessions-20261017.md` | 整文件=d4afb5a09c6d2998；sidecar=d4afb5a09c6d2998 |
| `06-verification-view-sessions/OPS-RO-领样-测3窗-甲73-verification-view-sessions-20261017.md.sha16` | 整文件=6af3418bb855d2e0 |
| `06-verification-view-sessions/README-本枪与旁证窗.md` | 整文件=56ba3bdc5f5a13c9 |
| `07-fixture-entry/夹具与页面入口-摘自RESULTS-b3fa54f1.md` | 整文件=65fa106e15396057 |
| `08-准修-停工边界/PRODUCT-STAMP-准修-领样空停①-F5sixth-A2锁绑recordId+B2空窗盖reset-叠DIAG18fd5c5b-20261017.md` | 整文件=6a2d734daaa4b8c7；sidecar=6a2d734daaa4b8c7 |
| `08-准修-停工边界/PRODUCT-STAMP-准修-领样空停①-F5sixth-A2锁绑recordId+B2空窗盖reset-叠DIAG18fd5c5b-20261017.md.sha16` | 整文件=60d1b85d1bb8d36e |
| `08-准修-停工边界/PRODUCT-STAMP-叠钉-乙准修1a814025-认DIAG442a590c-叠RO481c4d37-20261017.md` | 整文件=1d3f1cab49a95ccd；sidecar=1d3f1cab49a95ccd |
| `08-准修-停工边界/PRODUCT-STAMP-叠钉-乙准修1a814025-认DIAG442a590c-叠RO481c4d37-20261017.md.sha16` | 整文件=1772f447508109b3 |
| `08-准修-停工边界/README-准修与停工边界.md` | 整文件=77bba008bb894796 |
| `08-准修-停工边界/交接-Codex接管增量-三线-1017-THREE-LINES-01-20261017.md` | 整文件=e48d1b022ec0007e；sidecar=e48d1b022ec0007e |
| `08-准修-停工边界/交接-Codex接管增量-三线-1017-THREE-LINES-01-20261017.md.sha16` | 整文件=8780e6c4167283cb |
| `08-准修-停工边界/观察者-核-Boss全停-仅报告旁路65834a8c-20261017.md` | 正文(##sha16前)=6e59af4bf7454b32；整文件=443be5743e39b047 |

## downloadable

- `downloadable/1017-LINGYANG-FOCUS-04-evidence.zip` · 整文件 sha16 见同名 `.sha16` sidecar（当前 `32b4bec128d9ff80` · 259539 bytes；若再改 MANIFEST 需重打 zip）

