# 产品准修：双审病① · 补 Mapper `selectByIdForUpdate`
状态：已生效
时刻：2026-10-17 07:11 Asia/Shanghai
叠：FAIL `64372ea0` · RESULTS `f8bb6948` · DIAG `09c1992d4eb95536` · 运维 RO `d98fe77efa2469ed` · 还原采信 `dff1af39`

## 采信 DIAG
| 钉 | 值 |
|---|---|
| 根因 | 公网 Mapper 接口/XML **无** `selectByIdForUpdate`；Service/Auth 仍调 → `NoSuchMethodError`；未办结 |
| tip71 | **未带** Mapper（仅 Contoller+DTO+FE）→ 揭开缺陷 |
| MCLS | `7ea03915`（甲案有 `advanceStatusWithOpenCount`、无 ForUpdate） |
| WO33 | **另闸**（资料/`approvalAllowed`）· **不**并本包 |
| 继续确认 | **禁**当过关（重放同 500） |

## 准修主刀（勾主 · 拒次选）
| 勾 | 项 |
|---|---|
| **主** | 补 `QltWorkOrderMapper.selectByIdForUpdate(Long)` **接口 + XML**（`SELECT … FOR UPDATE`）；OUTER≡NESTED；**保留**甲案 `advanceStatusWithOpenCount`（禁回滚甲案收益） |
| 次选回退 `selectById` | **拒**（弱行锁，本枪不接受） |

## 验收句（开刷另章写全）
1. 重指派后 WO19：POST `/transition` → HTTP200 **且**业务办结（`closed` + TRANSITION ledger 有）
2. 屏：成功态；禁「继续确认」过关
3. WO33 资料闸 **本包不验**（另列）
4. 真点截图才算；挂上≠PASS；HTTP200≠唯一依据

## 禁
盲 tip71 再灌 · 整换 Contoller `44614cd1` · 碰案1 · 未准修 LIVE · 并 WO33 · 卸触发器

## 令
| 谁 | 令 |
|---|---|
| 研发 | 出 **Core Mapper tip**（接口+XML；保留甲案方法）→ RD-VERIFY → 求放行 |
| 测2 | HOLD 至 LIVE + **开刷章**（须含重指派） |
| 运维 | 禁自挂；等放行 |

## 盖了 / 没盖
- **盖了**：DIAG 采信；主刀准修；禁继续确认；WO33 另列
- **没盖**：放行；开刷；WO33 准修；PASS

红线：案1不动；查清楚再修；挂上≠PASS。
