# 产品准修：生成方案 · 甲补建 `entry_batch_source` + 乙 FE 露因
状态：已生效（**准出 tip**）
时刻：2026-10-17 06:11 Asia/Shanghai
依据：Jarvis 转【Boss 勾甲+乙】；定案 `b1bf36ca`；确认章 `64be7b5a`；DIAG `502f7a89`；AFTER `a3db7064`

## 盖了
| # | 准修 |
|---|---|
| **甲** | 现网补建/迁移表 `entry_batch_source`（及 EntryBatchReceiptService 同族 DDL/mapper 前提），使路 B（编辑后 force-save/status）业务真成功 |
| **乙** | FE：status 业务失败勿吞成笼统 INVALID，须露出缺表/属主等真因 |

## 两路纪律
- 路 A（未编辑直走真成功）**保留**；禁因路 A 废甲
- 缺表债未消 ≠ 已修好；挂上/屏绿 ≠ PASS（叠 `7cc6dadd`）

## tip 闸
1. **准出 tip**（甲+乙可一 tip）；须对照定案 `b1bf36ca` + 本准修
2. DDL 公网执行：运维 BEFORE + 产品/协调确认后挂；禁自 LIVE 当 PASS
3. RD-VERIFY → 放行 → LIVE → 开刷另章；RESULTS 禁自 PASS

## 验收（开刷后）
V1 编辑后再点「生成方案」：无缺表 ERROR；能 savePlan 或非缺表真因  
V2 路 A 仍成功  
V3 挂上≠PASS

## 没盖
PASS；LIVE 自认过；丙/丁/戊；双审/领样 tip 解冻。

红线：案1不动。
