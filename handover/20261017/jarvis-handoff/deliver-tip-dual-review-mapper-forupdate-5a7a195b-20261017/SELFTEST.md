# SELFTEST · Mapper ForUpdate · f87b79c3ced64448

| 查 | 结果 |
|---|---|
| JDK major | 52 |
| javap `selectByIdForUpdate(Long)` | 有 · descriptor `(Ljava/lang/Long;)Lcom/lei/system/domain/QltWorkOrder;` |
| javap `advanceStatusWithOpenCount` | **保留** |
| XML id `selectByIdForUpdate` + `FOR UPDATE` | 有 |
| XML `advanceStatusWithOpenCount` | **保留** |
| OUTER≡NESTED class | 同 sha `f87b79c3ced64448` |
| OUTER≡NESTED xml | 同 sha `a305b1d371af6551` |
| 无 Contoller/FE/WO33 | 清单明示 |

运行时（LIVE+开刷后）：WO19 POST transition → HTTP200 **且** closed + TRANSITION ledger；禁继续确认过关。
