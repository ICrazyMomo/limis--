# DIFF

## 甲 DDL
新建 `entry_batch_source` 空表（列见 ddl/COLUMNS.md）。

## 乙 FE
1. `entryBatch-vbmxXr3M.js`：force-save + force-save/status：`silentBusinessError`→`returnBusinessResponse`（保留 code/msg）
2. `EditTaskListFile-F5YzS4W5.js`：status 失败/INVALID 露 `msg` 并标注缺表/属主；路 A 早退不动
