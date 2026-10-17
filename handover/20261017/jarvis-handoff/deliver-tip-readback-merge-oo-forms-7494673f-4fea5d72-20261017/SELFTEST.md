# SELFTEST · tip readback-merge-oo-forms · 4fea5d72c8fb45e6 · 2026-10-17

## 静态（本包已做）

| 查 | 结果 |
|---|---|
| `node --check` PATCH JS | OK |
| ORIG sha16 | `b4ca9359` ≡ 现网开屏闸 |
| PATCH sha16 | `4fea5d72c8fb45e6` ≠ ORIG |
| import entryBatch `r`+`b`（resolve-draft + config） | 有 |
| import entryBatch `h`（document/generate） | **0** |
| 「重新生成」按钮/handler | **0**（仅禁注+「未重新生成」提示） |
| 「未能确认是否已有草稿簿」硬闸原文 | **0** |
| softProbeDraft / has_book → openOoReadOnly | 有 |
| 非明确 found → viewMode=forms | 有 |
| OnlyOfficeViewer import `index-NJVZXfJd` | 有 |
| forms 字段快照路径 | 有 |
| 禁词：密钥 / 案1 / entry_batch_source DDL | 无 |
| 不覆写 B3030 声明 | 见全量覆写清单 |

## 运行时（运维 LIVE 后 · 测/产品开刷 · 本包不执行）

| # | 句 | 期望 | 本 tip |
|---|---|---|---|
| B | 无簿 / 非明确 found | forms 字段快照 | **必验** |
| N1 | 无确认 | 禁硬开 OO | **必验** |
| A | 有簿 found+fileKey | OO 只读；无默认再生 | 有权威 found 则验；**无乙则另验/BLOCKED** |
| N2 | 有簿禁只出 forms | 同 A | 同 A |

挂上 ≠ PASS；SELFTEST_STATIC_OK ≠ 行为 PASS。
