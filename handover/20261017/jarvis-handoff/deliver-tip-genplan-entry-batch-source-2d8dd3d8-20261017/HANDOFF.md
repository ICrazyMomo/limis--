# HANDOFF · tip 生成方案 · 甲补建 entry_batch_source + 乙 FE 露因 · 2026-10-17

> **叠章**：准修 `PRODUCT-STAMP-准修-生成方案-甲补建entry_batch_source+乙FE露因-20261017.md` 盘 sha16=`1e894132f2b4b48b`（确认 `64be7b5a`；Boss 勾甲+乙）
> **定案** `b1bf36ca` · DIAG `502f7a89` · AFTER `a3db7064` · 阅裁禁 PASS `7cc6dadd`
> **追溯**：分支 `tip/genplan-entry-batch-source-on-9ab6a45a-20261017` · 短sha `2d8dd3d8` · 叠基 FINAL `9ab6a45a` · tag `tip/2d8dd3d8-on-9ab6a45a`（本地已打，未推）

## ① 产物
| 项 | 路径 / 值 |
|---|---|
| 目录 | `/workspace/artifacts/deliver-tip-genplan-entry-batch-source-2d8dd3d8-20261017/` |
| tgz | `tip-genplan-entry-batch-source-2d8dd3d8-20261017.tgz` · **外包钉** sha256=`7f87bb03c2d551ffbab14dd1c29c5472be29a27a70ab3f26b97b01c9a618b24a` · sha16=`7f87bb03c2d551ff`（产品改认 `5b873421`；禁再覆盖） |
| 叠基 FINAL | **`9ab6a45a`**（挂前运维实测；漂则停挂回产品；本 tip 含 FE 覆写 + DDL，无 Core jar） |
| 短sha | **`2d8dd3d8`** |
| 分支 | `tip/genplan-entry-batch-source-on-9ab6a45a-20261017` |
| tag | `tip/2d8dd3d8-on-9ab6a45a` |

## ② 刀面
| # | 内容 |
|---|---|
| **甲** | DDL 空表补建 `entry_batch_source`（列=OPS SQL 证据：actor_id,file_key,source_json,source_sha256,created_at）。**无** Core jar（LIVE 已有 EntryBatchReceiptService；缺的是表） |
| **乙** | FE：force-save/status 业务失败勿吞成笼统 INVALID；`entryBatch` 改 `returnBusinessResponse` 保留 msg；`EditTaskListFile` INVALID 分支露真因（缺表/属主/业务 msg） |
| **路 A** | 未编辑早退 `{ok:true,params:null}` **保留未改** |

## ③ 运维挂序（须写清）
1. **BEFORE**：产品/协调确认后，运维执行 `ddl/01-create-entry_batch_source.sql`（空表；禁灌行）
2. **再挂**本 tip FE 两文件同名覆写（或 DDL 与 FE 同窗，但 **表须先于** 编辑后 force-save 验路 B）
3. **禁自 LIVE**；RD-VERIFY → 放行章 → 运维 LIVE → 开刷另章；RESULTS 禁自 PASS（`7cc6dadd`）

## ④ 验收句（开刷后 · 非本枪）
- **V1** 编辑后再点生成方案：无缺表 ERROR；能 savePlan 或非缺表真因
- **V2** 路 A 未编辑仍成功
- **V3** 挂上 ≠ PASS

## ⑤ 红线
禁自 LIVE；案1 不动；密钥不进件；禁丙/丁/戊；禁双审/领样并包；Core jar 未改（本 tip 无）。
