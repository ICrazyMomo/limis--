# 1017-LINGYANG-FOCUS-04 证据包 INDEX
时刻：2026-10-17 09:02:55 Asia/Shanghai
路径：`/workspace/artifacts/1017-LINGYANG-FOCUS-04-evidence/`
票：FAIL裁`ffd0b7c2` · RESULTS`b3fa54f1` · tip`b9e2e413` · FE`9b695797` · 甲73 · withdrawal`71596dda-6927-41d1-8ec4-3eccb31a75ea`
口径：Codex单一实现DIAG；测3配合交原始字段；**禁**另建writer；**禁**复挂`b9e2e413`/`46664856`/`6d70`；报告旁路不打断。

## PRESENT

| 项 | 路径 |
|---|---|
| RESULTS全文 | `01-RESULTS/RESULTS-测3-领样-b9e2e413-甲73-空停①-20261017.md`（sha16=`b3fa54f12242a2e2`） |
| 产品裁 | `02-PRODUCT-STAMP/PRODUCT-STAMP-裁-领样F5sixth-…FAIL-令DIAG-20261017.md`（sha16=`ffd0b7c2370d9d30`） |
| 截图三点 | `03-shots/shots-领样-测3-b9e2e413-甲73-20261017/`（点前/继续后同帧/full） |
| tip/FE/LIVE/AFTER/VERIFY/放行/开刷 | `04-tip-FE-pins/` |
| Vue摘录（DOM替代） | `05-vue-extract/VUE-五元组-摘自RESULTS-b3fa54f1.md` |
| 夹具+入口URL | `07-fixture-entry/夹具与页面入口-摘自RESULTS-b3fa54f1.md` |
| 准修/停工边界 | `08-准修-停工边界/` |
| 旁证 verification×view-sessions（非本枪时刻） | `06-verification-view-sessions/`（G1/G2/测3早窗） |

## 缺（如实）

| 项 | 说明 |
|---|---|
| Vue `page.evaluate` 五元组 dump | evaluate 被拦；仅有 DOM 替代；无独立 CDP/trace |
| 本枪 verification×view-sessions **响应体全文** | RESULTS 仅记成对 HTTP200；08:34窗 RAW/HAR **无** |
| 本枪 HAR/Network trace 文件 | 无 |
| 本枪夹具造态 SQL 专用件 | 入口以 RESULTS 为准；无另存 BEFORE-AFTER SQL |

已令测3交缺项（有则贴、无则维持「缺」）。旁证窗不得自扩本枪 PASS。
