# RD-VERIFY-请核 · 双审 Mapper · selectUnresolvedProblemIdsForUpdate · tip `adf04e44`

请核本 tip：`deliver-tip-dual-review-mapper-unresolved-adf04e44-fa8ff6ad-20261017`

## 必核
1. **挂载面**：仅 Mapper class+xml · OUTER≡NESTED（`pkg/` + `nested-inject/`）；**不**覆写 Contoller/ServiceImpl/Auth/FE。
2. **字节**：NEW class=`30bbb73e75c12fb5` / xml=`958de353f30e6cae`；ORIG=`f87b79c3ced64448`/`a305b1d371af6551`。
3. **描述符**：javap-s `selectUnresolvedProblemIdsForUpdate:(Ljava/lang/Long;)Ljava/util/List;`
4. **保留**：`selectByIdForUpdate` + `advanceStatusWithOpenCount` 仍在 class+xml。
5. **XML**：`qlt_problem` · `work_order_id=#{id}` · `problem_status <> 'CLOSED'` · `FOR UPDATE`。
6. **常量池扫齐**：CONSTPOOL-SCAN.md · ServiceImpl 两方法均由本 tip 提供。
7. **叠基**：FINAL `167513940fcd1f9f`；tag `tip/adf04e44-on-16751394`；分支 `tip/dual-mapper-unresolved-on-16751394-20261017`。
8. **禁**：复灌 `6bab49cf` · 自 LIVE · 只改 FE · 并 WO33 · 卸触发器 · 回退 selectById · 案1。
9. major=52；**尚无放行章**。

章：准修 `fa8ff6ad` · DIAG `5f22ae22` · RO `3c80d5d5` · 裁 `af12d452` · 定盘 `20c0b04b`。

核过请出 RD-VERIFY 正章；FAIL 则写明描述符/挂载面/保留项哪条。
