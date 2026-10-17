# 领样 FOCUS-04 + Jarvis 接手交接 · 2026-10-17

本目录为 **2026-10-17** 公开仓 `ICrazyMomo/limis--` 的增量交接（非空仓重导）。同级保留 `handover/20261016/` 与下文「首包」路径不动。

**挂上≠PASS** · **HTTP200≠PASS** · 证据入库≠产品裁通过。

## 入口索引

| 路径 | 用途 |
| --- | --- |
| **`jarvis-handoff/`** | **主入口**：`交接-Jarvis-给新GrokBot-接手以来做了什么-20261017.md`、演示主链/Codex 三线、migrate-pack、bot-memory、交接§3 十条 `deliver-tip-*`、FOCUS-04 含响体/DIAG 补交、PRODUCT-STAMP/VERIFY 等 |
| `1017-LINGYANG-FOCUS-04-evidence/` | 首包 FOCUS-04 证据（PR 初版；jarvis-handoff 内为更新版含 `09-测3-DIAG补交` 等） |
| `jarvis-handoff/CODE-PUSH-03-bundles/` | CODE-PUSH-03 git bundle：**仅 README + SHA256SUMS**；`.bundle` 在 Release |

Jarvis 交接总述见：`jarvis-handoff/交接-Jarvis-给新GrokBot-接手以来做了什么-20261017.md`（sha16 见同目录 `.sha16`）。

## 本批推送校验（Boss 附件）

| 附件 | sha16 | 落盘 |
| --- | --- | --- |
| `part-docs-tips.zip` | `19a235d069070fbd` | 展开 → `jarvis-handoff/` |
| `code-push-bundles-half1.zip` | `813b9593499829a8` | Release 附件（与 half2 同 tag） |
| `code-push-bundles-half2.zip` | `9f33a4bae13c6f6e` | Release 附件（git 不进 `.bundle`） |

推送清单：`jarvis-handoff/MANIFEST-handover-push-20261017.md` · bundle 校验：`jarvis-handoff/CODE-PUSH-03-bundles/SHA256SUMS.txt`

Release tag：`handover-20261017-code-push-bundles` → <https://github.com/ICrazyMomo/limis--/releases/tag/handover-20261017-code-push-bundles>

## 首包 FOCUS-04（`1017-LINGYANG-FOCUS-04-evidence/`）

| 项 | 值 |
| --- | --- |
| 清单 | `INDEX.md` |
| INDEX sha16（首包） | `6fef17ab39c90309` |
| 源 zip sha16（首帖附件） | `c97bfbd9a9a443f9` |

jarvis-handoff 内 FOCUS-04 为补交后 INDEX（sha16 以 `jarvis-handoff/1017-LINGYANG-FOCUS-04-evidence/INDEX.md.sha16` 为准）。

## 缺项（未补齐勿当 PASS）

| 项 | 说明 |
| --- | --- |
| Vue `page.evaluate` 五元组 dump | evaluate 被拦；DOM 摘录 / DIAG 补交字段见 jarvis-handoff 证据树 |
| 本枪 verification 响体全文 / HAR | 旁证窗在 `06-verification-view-sessions/`；本枪独立 HAR **无** |
| （无） | CODE-PUSH half1+half2 已在 Release |

## 红线

- 密钥、token、`.env` **未**入 git 树。
- 禁止复挂已冻 tip（见 jarvis-handoff 内 PRODUCT-STAMP / OPS）。
