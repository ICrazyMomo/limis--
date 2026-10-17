# OPS-MOUNT · tip demo-bypass-qc-block-report-audit · PRE b4eedcf1

放行后运维（本包**不自挂**）：

1. 备份现网 nested `BOOT-INF/lib/lei-system-1.0.0.jar` 内 `com/lei/system/service/impl/QltTaskQualityGate.class`（挂前 sha 必须 = ORIG `bb4d9ec345d066be…`）。
2. 用本 tip PATCH class（sha16=`e7d2f3b18c2fe075`）覆盖该成员（或等价 nested-inject / lib-overlay）。
3. 重启/热更按现网惯例。
4. 禁自 LIVE；开测另令；挂上≠PASS。
5. 演示收口：按 HANDOFF/ROLLBACK 覆回 ORIG。
