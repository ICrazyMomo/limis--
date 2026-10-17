/**
 * DRAFT · 源码等价旁路（非 ORIG 重编产物）
 * 准修 sha16=04b85f9b · 叠基 FINAL b4eedcf1 · 演示取消质控未过完拦报告审核闸
 *
 * 刀面：reportSignEntryBlock / reportSignEntryBlockByPool 入口早退 null
 * 范围：admin ∧ (orderNo=HT2026101606 ∨ orderId=900354 ∨ qualityPoolId=57 ∨ labPoolId=901082)
 * 效果：采样支+实验支均不跑 inspectSource → FE 认到的 reportSignEntryBlock 为空 → 不灰
 * 恢复：撤旁路 / 覆回 ORIG class（见 HANDOFF·ROLLBACK）
 *
 * 注意：本草稿仅说明意图；定稿 tip 须 ASM 叠在现盘 ORIG≡b4eedcf1 EXTRACT 上。
 */
package com.lei.system.service.impl;

// --- 拟插入的私有谓词（源码形态）---
/*
private static final String DEMO_ORDER_NO = "HT2026101606";
private static final long DEMO_ORDER_ID = 900354L;
private static final long DEMO_QTP_ID = 57L;
private static final long DEMO_LTP_ID = 901082L;

private boolean demoQcReportSignBypassCase(QltReportCase report) {
    if (report == null) return false;
    if (!demoIsAdmin()) return false;
    if (DEMO_ORDER_NO.equals(report.getOrderNo())) return true;
    Long oid = report.getOrderId();
    return oid != null && oid.longValue() == DEMO_ORDER_ID;
}

private boolean demoQcReportSignBypassPool(Long taskPoolId, java.util.Map pool) {
    if (!demoIsAdmin()) return false;
    if (taskPoolId != null && taskPoolId.longValue() == DEMO_QTP_ID) return true;
    if (pool != null) {
        Long lab = longOrNull(pool.get("labPoolId"));
        if (lab != null && lab.longValue() == DEMO_LTP_ID) return true;
    }
    return false;
}

private boolean demoIsAdmin() {
    try {
        return com.lei.common.utils.SecurityUtils.isAdmin(
            com.lei.common.utils.SecurityUtils.getUserId());
    } catch (RuntimeException ex) {
        return false;
    }
}

// reportSignEntryBlock 入口：
public String reportSignEntryBlock(QltReportCase report) {
    if (demoQcReportSignBypassCase(report)) {
        return null; // tip: 演示旁路
    }
    // ... ORIG body ...
}

// reportSignEntryBlockByPool：在 pool map 取出后、inspectPool 前：
public String reportSignEntryBlockByPool(Long taskPoolId) {
    // ... ORIG null/size 校验 ...
    // Map pool = ...
    if (demoQcReportSignBypassPool(taskPoolId, pool)) {
        return null; // tip: 演示旁路（采样+实验整闸）
    }
    // String detail = inspectPool(pool, ...);
    // ...
}
*/
