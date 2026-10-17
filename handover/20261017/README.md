# 领样 FOCUS-04 证据交接 · 2026-10-17

本目录为 **1017-LINGYANG-FOCUS-04** 证据包的公开仓增量交接：领样 F5sixth 测3（甲73 · 空停①）相关 RESULTS、产品裁、截图、tip/FE 钉、Vue 摘录、verification 旁证窗、准修/停工边界等。**挂上≠PASS**；本包为 FAIL 裁票与旁证材料，不得因入库或挂载自扩为通过。

同级保留 `handover/20261016/` 全量交接，本提交不覆盖、不删除既有目录。

## 包位置与校验

| 项 | 值 |
| --- | --- |
| 展开路径 | `1017-LINGYANG-FOCUS-04-evidence/` |
| 清单 | `1017-LINGYANG-FOCUS-04-evidence/INDEX.md` |
| INDEX sha16 | `6fef17ab39c90309` |
| 源 zip（本地交接名） | `1017-LINGYANG-FOCUS-04-evidence.zip` |
| 源 zip sha256 前 16 位 | `c97bfbd9a9a443f9` |

详细条目与票号见包内 `INDEX.md`（FAIL裁 `ffd0b7c2` · RESULTS `b3fa54f1` · tip `b9e2e413` · FE `9b695797`）。

## 缺项（如实，未补齐勿当 PASS）

| 项 | 说明 |
| --- | --- |
| Vue `page.evaluate` 五元组 dump | evaluate 被拦；仅有 `05-vue-extract/` DOM 替代摘录 |
| 本枪 verification×view-sessions **响应体全文** | RESULTS 仅记成对 HTTP 200；本枪窗 RAW/响体 **无** |
| 本枪 HAR / Network trace | **无** 独立 HAR 或 trace 文件 |
| 本枪夹具造态 SQL 专用件 | 入口以 RESULTS 为准；无另存 BEFORE-AFTER SQL |

旁证目录 `06-verification-view-sessions/` 为 G1/G2/测3早窗，**非**本枪 08:34 时刻全文；不得用旁证自扩本枪 PASS。

## 红线

- 密钥、token、预签 URL **未**入 git 树；文中仅流程说明或脱敏引用。
- 禁止复挂 tip `b9e2e413` / `46664856` / `6d70` 等已冻钉（见包内 PRODUCT-STAMP / OPS 件）。
