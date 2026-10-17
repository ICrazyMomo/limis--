# HANDOFF · tip entry-resolve-draft found+fileKey · on FINAL `16751394` · 20261017

**交 limis-研发 RD-VERIFY → 产品放行 → 运维按 OPS-MOUNT 叠挂。研不自挂 / 不自 LIVE。HANDOFF 尚无放行章。**

## 产物
| 项 | 值 |
|---|---|
| 目录 | `/workspace/artifacts/deliver-tip-entry-resolve-draft-found-filekey-on-16751394-20261017/` |
| tgz | `core-tip-entry-resolve-draft-found-filekey-on-16751394-20261017.tgz`（权威指纹见同目录 `TGZ.sha256` / `SHA16-TGZ.txt`） |
| major | **52** |
| marker | `TIP_ENTRY_RESOLVE_DRAFT_FOUND_FILEKEY_20261017` |
| ORIG Receipt | `8301b6618420a538…`（sha16=`8301b6618420a538` ≡ EXTRACT PRE） |
| PATCH Receipt | `0a6ac4d9da060498…`（sha16=`0a6ac4d9da060498`） |
| PATCH $1 | `4b3700868052b666…` |
| RowWriter | **KEEP** `0e3b10c6bd82ac5b` |
| **PRE / 叠基 FINAL** | **`16751394`**（全 `167513940fcd1f9f41bdec5bfd5f1615524735f870d9b74643168037f3fd3654`） |
| EXTRACT | `OPS-EXTRACT-EntryBatch-resolveDraft-FINAL16751394-20261017/` MANIFEST sha16=`613574d703eefb2c` · PID=`3204604` |

## 可追溯（强制）
| 项 | 值 |
|---|---|
| **分支名** | `tip/entry-resolve-draft-found-filekey-on-16751394-20261017` |
| **短 sha** | `7aa266fc`（全长 `7aa266fcf1a171ce2ded60188b067236174353ce`） |
| **叠基 PRE** | **`16751394`** |
| **tag** | `tip/0a6ac4d9-on-16751394` |
| 仓库（交件内） | `tip-git/` |
| 源码指向 | `src/com/lei/system/service/impl/EntryBatchReceiptService.java` |
| 远端 | 本箱无 remote / 未推送 |
| 旁证 | `GIT-TRACE.txt` |

## 准修 / 叠钉
| 钉 | sha16 / 件 |
|---|---|
| 准修（已盖） | **`e2386021`** `PRODUCT-STAMP-准修-查看录入有簿乙软探权威源-叠7b480577-20261017.md` |
| 求准修叠 | `7b480577` |
| DIAG | `558eaa2f` |
| RESULTS 测3 | `da091213` |
| 甲 FE（禁动） | `4fea5d72` |
| 卡停刀（已解） | 原 `7d7fa673` · 摘盘齐后出本 tip |

## 刀面（乙-B）
1. **`EntryBatchReceiptService.findActiveDraft`**：保留 entry_batch_source 活跃编辑草稿软探；缺表/SQL → fail-soft 空列表（**不**抛未知异常）。
2. **权威回读键映射**：lab 且无活跃编辑草稿时，只读查 `sys_temp_file`（`file_type=06` `del_flag=0` `business_table_name=sys_lab_entry_readback_{templateId}` `foreign_key∈rowKeys`）→ 稳定返回 `found=true`+`fileKey`（可选 tempfileId / generationRows）。
3. 缺行/不齐 → `found:false`（仅键 found）。
4. **禁**本 API 默认生成/重新生成簿（不调 createDocument / createFrozenReadback / registerGeneration）。
5. **禁**动甲 FE；禁改 `/lab/entry`；禁迁建 `entry_batch_source` 当主修；禁案1；禁自 LIVE；SourceReader outer 缺 → 不臆造。

## 验收对齐（开刷另章）
| # | 句 |
|---|---|
| A′ | 有簿池行（权威 readback 行存在）→ resolve-draft `found=true`+`fileKey` → FE 可进 OO 只读 |
| B′ | 无行 → `found=false` → forms + 旁注 |
| N | 本口不默认再生 |

## 红线
禁自挂；禁自 LIVE；禁写库；禁案1；禁动甲 FE `4fea5d72`；禁 bak；密钥不进件；**尚无放行章**；挂上≠PASS。
