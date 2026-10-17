# DIFF · demo-bypass-qc-block-report-audit

## ① reportSignEntryBlock(QltReportCase)（刀）
方法入口插入：若 `report!=null` 且 `SecurityUtils.isAdmin(getUserId())` 且
（`"HT2026101606".equals(report.getOrderNo())` ∨ `orderId.longValue()==900354L`）
→ `return null`（不跑 `inspectCase`→采样/实验 `inspectSource`）。

## ② reportSignEntryBlockByPool(Long)（刀）
1. **入口**：`poolId.longValue()==57L` ∧ admin → `return null`（QTP57≡本夹具 LTP901082 工作台行）。
2. **Map pool astore_3 后**：admin ∧ `longOrNull(pool.get("labPoolId"))==901082L` → `return null`（字面 LTP 旁路；采样+实验均不进 `inspectPool`）。

## ③ 未改
`inspectSource` / `inspectPool` 体；`requireTask`；`QualityReadServiceImpl`；`QltReportWorkspaceAccess`；FE。

## 编法
ASM 叠 ORIG（`COMPUTE_FRAMES|COMPUTE_MAXS`）；非全量 javac。参考 SoD tip 形态。
