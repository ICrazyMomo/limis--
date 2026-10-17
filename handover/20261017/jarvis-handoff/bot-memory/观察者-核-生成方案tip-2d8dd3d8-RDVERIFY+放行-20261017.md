# 观察者核 · 生成方案 tip `2d8dd3d8` · 2026-10-17 06:20

## 采信
| 件 | sha16 | 判 |
|---|---|---|
| tgz | `0eec8749b18e8bb6` | 外包实算一致 |
| RD-VERIFY | `573517c1` | PASS（甲 DDL 空表列齐 + 乙 FE 两文件；无 Core；叠准修 `1e894132`） |
| 放行挂载 | `c5d5c48a` | 准 LIVE；挂序 **DDL→FE**；叠基 FINAL `9ab6a45a` 漂则停 |

## 抽查
- DDL：`CREATE TABLE IF NOT EXISTS entry_batch_source` 五列齐；禁灌行
- FE NEW sha8：ETL `d34b7f7a` · EB `c3a11745`；路 A 早退保留于 EditTaskListFile
- 不含双审/领样并包

## 现行
运维可 LIVE（须 BEFORE 记 DDL + 挂序硬）；挂上≠PASS；开刷另章后再测；验收 V1/V2/V3。
