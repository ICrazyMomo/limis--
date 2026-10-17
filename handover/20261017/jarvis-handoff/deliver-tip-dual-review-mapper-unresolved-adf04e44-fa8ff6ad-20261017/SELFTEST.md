# SELFTEST · Mapper Unresolved · 30bbb73e75c12fb5

| 查 | 结果 |
|---|---|
| JDK major | 52（见 MAJOR52.txt） |
| javap `selectUnresolvedProblemIdsForUpdate` | 有 · descriptor `(Ljava/lang/Long;)Ljava/util/List;` |
| javap `selectByIdForUpdate` | **保留** · `(Ljava/lang/Long;)Lcom/lei/system/domain/QltWorkOrder;` |
| javap `advanceStatusWithOpenCount` | **保留** |
| XML id Unresolved + FOR UPDATE | 有（`problem_status <> 'CLOSED'` · `work_order_id=#{id}`） |
| XML `selectByIdForUpdate` + FOR UPDATE | **保留** |
| XML `advanceStatusWithOpenCount` | **保留** |
| OUTER≡NESTED class | 同 sha `30bbb73e75c12fb5` |
| OUTER≡NESTED xml | 同 sha `958de353f30e6cae` |
| 常量池扫齐 | 见 CONSTPOOL-SCAN.md · **PASS** |
| 无 Contoller/ServiceImpl/Auth/FE/WO33 | 清单明示 |

运行时（LIVE+开刷后）：WO19 重指派后点通过 → 业务成功且 closed+TRANSITION；有未解决问题 → 409；禁继续确认过关。
