package com.lei.system.service.impl;

/**
 * TIP 源码等价说明（非全量 javac 重编；实装为 ASM 叠 ORIG）。
 * 准修 04b85f9b · 叠基 FINAL b4eedcf1 · ORIG sha16=bb4d9ec345d066be
 *
 * 刀：reportSignEntryBlock* 入口 / byPool·labPoolId 早退 null
 * 范围：admin ∧ (orderNo=HT2026101606 ∨ orderId=900354 ∨ QTP=57 ∨ labPoolId=901082)
 * 效果：不跑 inspectPool→inspectSource（采样支+实验支整道旁路）
 * FE：只认 API reportSignEntryBlock；空则不灰
 */
public class QltTaskQualityGate {
    // --- tip inserts (conceptual) ---
    // reportSignEntryBlock(QltReportCase report):
    //   if (report != null && SecurityUtils.isAdmin(SecurityUtils.getUserId())) {
    //     if ("HT2026101606".equals(report.getOrderNo())) return null;
    //     Long oid = report.getOrderId();
    //     if (oid != null && oid.longValue() == 900354L) return null;
    //   }
    //   ... ORIG ...
    //
    // reportSignEntryBlockByPool(Long taskPoolId):
    //   if (taskPoolId != null && taskPoolId.longValue() == 57L
    //       && SecurityUtils.isAdmin(SecurityUtils.getUserId())) return null;
    //   ... load Map pool ...
    //   if (admin && longOrNull(pool.get("labPoolId")) == 901082L) return null;
    //   ... ORIG inspectPool ...
}
