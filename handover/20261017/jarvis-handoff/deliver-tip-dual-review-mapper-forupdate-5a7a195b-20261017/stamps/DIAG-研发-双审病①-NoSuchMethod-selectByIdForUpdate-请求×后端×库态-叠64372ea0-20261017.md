# DIAG · 研发 · 双审病① · NoSuchMethod `selectByIdForUpdate` · 请求×后端×库态 · 2026-10-17

- **状态**：DIAG 一次交齐（禁 tip / 禁改码 / 禁 LIVE / 禁写库 / 禁案1）
- **时刻**：2026-10-17 07:05 Asia/Shanghai
- **叠裁**：`PRODUCT-STAMP-裁-双审病①复验-FAIL-令DIAG-Mapper缺方法-20261017.md` 盘 sha16=`64372ea03dedd61f`
- **RESULTS**：`双审-71a467ac-测2/RESULTS-测2-双审-病①-POST办结-71a467ac-复验3822e9c3-20261017.md` 盘 sha16=`f8bb6948b9589a7d`
- **POST**：`双审-71a467ac-测2/POST-病①-900321-WO19.json`
- **AFTER 指派**：`OPS-AFTER-双审病①-指派WO19+33-20261017.md` sha16=`e6b5c796`（测前）；还原 `OPS-AFTER-双审病①-指派还原-WO19+33-20261017.md` sha16=`7a97c8c2`
- **运维 RO（已叠）**：`OPS-RO-双审病①-Core-selectByIdForUpdate-WO19态-20261017.md` 盘 sha16=`d98fe77efa2469ed`
- **LIVE tip**：`71a467ac` · FINAL=`7080b882` · Contoller=`3afd84f8`
- **执行**：limis-研发执行器 · 只读 DIAG · **未 tip**

---

## 0 · 结论先行

| 项 | 裁 |
|---|---|
| 根因一句 | tip `71a467ac` 仅注入 Contoller transition 口，打通后进 `QltWorkOrderServiceImpl.transition`→调 `Mapper.selectByIdForUpdate`；公网实载 Mapper 接口/XML **无**该方法（甲案叠入 MCLS=`7ea03915`）→ `NoSuchMethodError` → 未办结 |
| tip `71` 是否带 Core/Mapper | **否**（交包 5 件：Contoller+DTO×2+FE×2；清单明示 Mapper 不覆写） |
| `8dcf7b68` | **非 tip**：是 OPS-LIVE 双审 AFTER 盘全文 sha16；亦不含 Mapper |
| 病① Contoller 面 | HTTP200≠404 但体 code=500 → **FAIL**（与裁一致） |
| WO33 灰 | **另闸**（资料 `fe()`/`approvalAllowed`）；非本 Mapper 缺方法同包 |

---

## 1 · 五问

### Q1 · 公网 Core 实载是否含 `selectByIdForUpdate`

**否（接口=0 · XML=0；调用方字符串=有）。**

证据（运维 RO `d98fe77e` · FINAL jar sha16=`7080b882` · PID=3103984）：

| 探针 | 结果 |
|---|---|
| `QltWorkOrderMapper` 接口 javap（FAT≡nested，class sha16=`7ea039156082e0cd`） | 有 `selectById` / `selectByWorkOrderId` / `selectByIdempotencyKey` / `selectWorkbench` / `insert` / `advanceStatus` / `advanceStatusWithOpenCount`；**无** `selectByIdForUpdate` |
| `QltWorkOrderMapper.xml` | id 清单 **无** `selectByIdForUpdate`；无挂该 id 的 `FOR UPDATE` |
| `QltWorkOrderServiceImpl`（nested lei-system） | 常量池 **有** `selectByIdForUpdate` |
| `QltReviewAuthorizationService` | 常量池 **有** `selectByIdForUpdate` |

盒内旁证对齐：

- 甲案 tip LIVE：`OPS-LIVE-⑥C1-甲案-同事务办结-a9b059f7` 钉 Mapper.class OUTER≡NESTED=`7ea039156082e0cd`（同字节于 `deliver-tip-qc0402-same-tx-return-jia-20261017/`）；后续气象/⑥C1 消 state 等 KEEP 该 MCLS；tip71 **未动** Mapper。
- 甲案 Mapper 源/class：仅有 `selectById` 族 + `advanceStatusWithOpenCount`，**无** ForUpdate。
- 历史 LIVE extract（0402）`QltWorkOrderServiceImpl.transition` 首行即 `workOrderMapper.selectByIdForUpdate(id)`（decompiled L174）。
- 盒内 limis 树 `QltWorkOrderMapper.java/.xml` 同样无 ForUpdate（与现网接口一致）。

→ 调用方（Service/Auth）编译期期望方法，运行时接口未声明 → 与测2 `NoSuchMethodError` **字节级一致**。

### Q2 · tip `71a467ac`（及 `8dcf7b68`）交包清单是否含 Core

**否。**

| 对象 | 含 Core/Mapper？ | 依据 |
|---|---|---|
| tip `71a467ac` | **否** | `全量覆写清单.md`：覆写/新增=**5**（Contoller `3afd84f8` · AssignmentRequest OUTER+nested `b4f90b0d` · FE Action `fd005595` · Flow `2d07100e`）；共享入口表写明 **WorkspaceAccess / AME / Mapper — 否** |
| RD-VERIFY `df70c6bb` | 同上 | 10/10 PASS 静态核包；未列 Mapper |
| OPS-LIVE `f634547a`（群报全文 sha 前缀常写作 `8dcf7b68`） | **否 tip** | `8dcf7b68`=LIVE AFTER 盘 sha16，非 tip 短 sha；盘面只叠 Contoller/Assign/FE，Auth/LabEntry **KEEP**，未列 Mapper 变更 |
| tip `2d8dd3d8`（生成方案，叠基 FINAL=`7080b882`） | 无关本枪 | FE/DDL 票；非 Mapper ForUpdate |

### Q3 · WO19 transition 调用链 × Mapper 接口/XML 签名

```
FE ReviewApprovalAction「审核通过」
  → confirmedWriteFlow.run(approve, {to_status:closed, expected_version,…})
  → POST /tlyf/quality/qlt/work-order/19/transition
       HTTP 200 · body code=500
       msg=NoSuchMethodError: QltWorkOrderMapper.selectByIdForUpdate(Ljava/lang/Long;)Lcom/lei/system/domain/QltWorkOrder;
  → QualityWriteGateController.transitionWorkOrder  (tip71 注入自 donor 44614cd1 方法体)
       → IQltWorkOrderService.transition(id, req, operatorId, tenantId)
  → QltWorkOrderServiceImpl.transition  (@Transactional)
       → workOrderMapper.selectByIdForUpdate(id)   ★ 炸点（invokeinterface）
       → …（未达）requireApproval / advanceStatus / recordLedger(WORK_ORDER_TRANSITION)
```

| 层 | 签名 / 现状 |
|---|---|
| Contoller | `transitionWorkOrder(Long, QltWorkOrderTransitionRequest, String)` → `workOrderService.transition(...)`（NEW Contoller 有；ORIG `4e89149b` 无 → 旧枪 404） |
| Service | `transition(Long, QltWorkOrderTransitionRequest, Long, Long): AjaxResult`；首锁行调 `selectByIdForUpdate` |
| Mapper 接口（实载） | **无** `QltWorkOrder selectByIdForUpdate(Long)` |
| Mapper XML（实载） | **无** `<select id="selectByIdForUpdate">` |
| 期望签名（调用方） | `selectByIdForUpdate(Ljava/lang/Long;)Lcom/lei/system/domain/QltWorkOrder;` |

请求证据：`POST-病①-900321-WO19.json` · 点时刻 06:55:57 CST · nginx 06:55:58 HTTP200 体长 220（RO §1.4）。

库后果（测后→还原后 RO）：WO19 仍 `pending_review` · TRANSITION ledger=**0** · 未 closed。

### Q4 · 500 后 PENDING_CONFIRMATION 悬挂如何清（只读结论）

**库无 PENDING_CONFIRMATION 可清；悬挂在 FE `confirmedWriteFlow` sessionStorage pending。**

| 面 | 事实 | 清法（只读结论 · 本执行器未操作） |
|---|---|---|
| WO.status | 仍 `pending_review`（≠ PENDING_CONFIRMATION）；全库该枚举 **0 行**（RO §3） | 无需清库 status；根因未修前勿指望 transition 写 closed |
| ledger | `WORK_ORDER_TRANSITION` for WO19 = **0** | 无悬挂 ledger 可删 |
| assignment | 测中曾有 id=2→900321；运维还原已 DELETE（`7a97c8c2`） | 指派侧已还原；再测须另令重指派 |
| FE pending | HTTP200+code=**500** 不在 Flow 拒收清 pending 集合 `{400,403,404,409,422}` → catch 保留 pending，文案「操作结果尚未确认，请继续确认原操作；暂勿重新提交。」（与 RESULTS 原文一致） | **禁点「继续确认」**（重放同 500）；刷新/退出登录清 `sessionStorage` key `qc-confirmed-write:v1:{actor}:{scene}:{woId}` 可消钮侧悬挂；**根治**须准修补 Mapper 方法（+XML）后再办结 |

### Q5 · WO33 灰因是否同包

**否 · 另闸（资料闸 / `approvalAllowed`）。**

| 对照 | WO19（采样） | WO33（结果） |
|---|---|---|
| 钮 | 绿可点 | **灰** `is-disabled` |
| POST | 有 transition → 500 | **无**（禁硬点） |
| 旁注 | 点后「请先确认上次…」（FE pending） | 「实验资料已变化，请重新核对原始记录；请先退回再交 / 核对原始记录后再刷新」 |
| 根因 | Mapper 缺 `selectByIdForUpdate` | FE `fe()`：`approvalAllowed!==!0` → `approvalBlockReason`；tip71 **I′** 仅 `guideI()` 追加指引，**未**放宽 `fe()` |
| 与 tip71 | Contoller 注入暴露写口缺陷 | HANDOFF 明示：C′ 挂上后 WO33 仍灰 ≠ 病②已修；资料闸另列 |

---

## 2 · 断点因果（业务话）

1. 甲案 tip 把现网 `QltWorkOrderMapper` 换成 `7ea03915`（有 `advanceStatusWithOpenCount`、无 ForUpdate），Service/Auth 仍引用 ForUpdate。
2. tip71 只补 Contoller 映射，**未带** Mapper/Core → POST 从 404 变成进 Service → 立刻 NoSuchMethodError。
3. 非测员错、非指派错（指派落库后钮可点已证）；属 **Core Mapper 与调用方脱节**，被 Contoller 注入**揭开**。

---

## 3 · 证据锚点

| 锚 | 路径 / 值 |
|---|---|
| 裁章 | `64372ea03dedd61f` |
| RESULTS | `f8bb6948b9589a7d` |
| POST WO19 | `…/POST-病①-900321-WO19.json` |
| OPS-RO Core×WO19 | `d98fe77efa2469ed` · FINAL=`7080b882` · MCLS=`7ea03915` · INTERFACE_HAS=0 |
| tip71 清单 | `deliver-tip-qc-dual-review-Iprime-71a467ac-20261017/全量覆写清单.md` · Mapper=否 |
| 甲案 LIVE Mapper | `OPS-LIVE-⑥C1-甲案-…` · `7ea039156082e0cd` |
| Service 调用 | `OPS-LIVE-EXTRACT-…/decompiled/…/QltWorkOrderServiceImpl.java` L174 |
| AFTER 指派/还原 | `e6b5c796` / `7a97c8c2` |

---

## 4 · 准修指向（本件≠准修≠tip）

求产品另盖准修后，研发方可动（本 DIAG **禁出 tip**）：

- **主刀**：补齐现网 `QltWorkOrderMapper` 接口方法 `selectByIdForUpdate(Long)` + XML（`SELECT … FOR UPDATE`）· OUTER≡NESTED；**保留**甲案已有 `advanceStatusWithOpenCount`（禁回滚甲案收益）。
- 或：改 Service/Auth 回退 `selectById`（弱于行锁；须产品裁是否可接受）——次选。
- 验收：WO19（重指派后）POST transition HTTP200 且业务办结（closed + TRANSITION ledger）；禁把「继续确认」当过关；WO33 资料闸另列。
- **禁**：盲 tip71 再灌；整换 Contoller `44614cd1`；碰案1；未准修 LIVE。

---

## 5 · 红线自检

未 tip · 未改码 · 未 LIVE · 未写库 · 未碰案1 · 未把 HTTP200 当 PASS · 未把继续确认当过关 · 运维 RO 已叠 · 指派还原归运维（已 `7a97c8c2`）。

---

## 件

`/workspace/artifacts/DIAG-研发-双审病①-NoSuchMethod-selectByIdForUpdate-请求×后端×库态-叠64372ea0-20261017.md`
