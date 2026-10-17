# 产品准修：双审 Mapper · 补 `selectUnresolvedProblemIdsForUpdate`
状态：已生效
时刻：2026-10-17 07:44 Asia/Shanghai
叠：FAIL裁 `af12d452` · RESULTS `20e910cb` · DIAG `5f22ae22` · 运维 RO `3c80d5d5` · 求准修 `68e0d02e` · tip LIVE `6bab49cf`（仅 ForUpdate）

## 采信 DIAG
| 钉 | 值 |
|---|---|
| 根因 | tip `6bab49cf` 只补 `selectByIdForUpdate`；公网 Mapper 接口+XML **仍无** `selectUnresolvedProblemIdsForUpdate(Long)→List`；`transition(to=closed)` → `NoSuchMethodError` → WO19 未办结 |
| RO | VERDICT=`MISSING_BOTH`/`ABSENT`；iface=0 · XML=0；对照 ForUpdate=PRESENT |
| 请求×后端×库态 | 三面齐（nginx×app 同秒 500；未 closed/未离待审）；assignment 列快照轻欠不翻根因 |
| WO33 | **另根**（资料闸）· **不**并本包 |
| 继续确认 | **禁**当过关（=重放同 500） |

## 准修主刀（勾主）
| 勾 | 项 |
|---|---|
| **主** | 基现网 Mapper `f87b79c3`/`a305b1d3`（**保留** `selectByIdForUpdate` + 甲案 `advanceStatusWithOpenCount`）再补三件套：①接口 `List<Long> selectUnresolvedProblemIdsForUpdate(@Param("id") Long id)` · descriptor≡`(Ljava/lang/Long;)Ljava/util/List;`；②XML `<select id="selectUnresolvedProblemIdsForUpdate" resultType="long">` 查 `qlt_problem`：`work_order_id=#{id}` 且 `problem_status <> 'CLOSED'` 的 id，并 `FOR UPDATE`；③OUTER≡NESTED · JDK8 major=52 · 仅 Mapper class+xml |
| 扫齐 | 出包前对 ServiceImpl（及 Auth）常量池做 Mapper 引用差分，**禁再漏**下一 `select*ForUpdate` |
| 次选只改 FE/绕继续确认 | **拒** |
| 回退 `selectById` / 整换 Contoller / 并 WO33 | **拒** |

## 负例口径（钉死）
| 条件 | 期望 |
|---|---|
| 无未解决问题 | 可 closed + TRANSITION ledger |
| 有未解决（`problem_status <> 'CLOSED'`） | **409** `UNRESOLVED_PROBLEMS`（对齐 Service）；禁当办结 |

## 验收句（开刷另章写全）
1. WO19 重指派后：点「通过」→ HTTP 业务成功 **且** 库 `closed` + TRANSITION ledger；屏无「继续确认」悬挂主链
2. 负例：有未解决问题时不得办结（409）；无未解决仍可办结
3. **禁**：仅点「继续确认」即报 PASS
4. 真点截图才算；挂上≠PASS；HTTP200≠唯一依据；WO33 本包不验

## 禁
盲 tip · 自 LIVE · 复灌 `6bab49cf` 当齐 · 只 FE 改钮 · 继续确认当过 · 写库清悬挂 · 碰案1 · 并 WO33 · 卸触发器

## 令
| 谁 | 令 |
|---|---|
| 研发 | 出 **Core Mapper tip**（本刀面）→ RD-VERIFY → 求放行；**禁自 LIVE** |
| 测2 | HOLD 至 LIVE + **开刷章**（须含重指派）；禁继续确认当过 |
| 运维 | 禁自挂；等放行 |

## 盖了 / 没盖
- **盖了**：DIAG/RO 采信；主刀准修；负例口径；禁继续确认；WO33 另列
- **没盖**：放行；开刷；WO33 准修；PASS；模块 PASS

红线：案1不动；查清楚再修；挂上≠PASS；双审同刀。
