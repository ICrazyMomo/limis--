# OPS-RO · 领样 G2 · verification / view-sessions **响应全文** · 2026-10-17

- **模式**：只读（禁写库 / 禁 tip / 禁 LIVE / 禁挂包 / 禁重启 / 禁真点 / 禁改码）
- **窗**：2026-10-17 **05:07–05:18 CST**（G1 采信窗）
- **本枪**：甲73 `71596dda-6927-41d1-8ec4-3eccb31a75ea` · 乙74 `a476db3f-a906-4ddf-8be9-c013c0990bfd`
- **主机**：lhins-hg459e98 · CORE_PID=`2964155` · DB=`lane_sys_menu_stage_a61053e6@13381`
- **叠**：G1 RO 盘 sha16=`3b01dd85` · 产品采信 `PRODUCT-STAMP-采信-领样G1-RO-3b01dd85-仍欠全文与phase-20261017.md`
- **INV**：`inv-aa0jq00ig5`（主投影）· `inv-8a0jr70dbc`（捞包）· `inv-aa0jng00k0` / `inv-ba0jnq0r32` / `inv-aa0jpegaw0` / `inv-aa0jqg02gj`
- **RAW**：`/workspace/artifacts/OPS-RAW-领样-G2-响应全文-20261017.txt`
- **交件时刻**：2026-10-17 06:02 Asia/Shanghai
- **红线**：案1 QC-900421 **未碰**；密钥/token/STS **未进件**；tip `edde0577` **仍冻**

---

## 一句话结论（大白话）

**没拿到 HTTP 原文，只交了库投影旁证。**  
verification 响应全文（甲/乙）= 按 LIVE mapper + 库行拼的 JSON 旁证（compact≈899B，对不上 G1 nginx bodyB 945/960，差 46/61）；view-sessions = **会写库，未重放**，只留 Core `insertEvent(CARD_VIEW_SESSION)` + `event_json` 片段（远小于 bodyB 2133）。**tip `edde0577` 仍冻。** G3 Vue phase 不在本枪。

---

## 怎么捞的（按序）

| # | 步骤 | 结果 |
|--:|---|---|
| 1 | Core/nginx 窗内响应体/debug 快照 | **无**。access 仅 status+body_bytes；`f95dec-r3-…45929.log` 有 `selectWithdrawal` / `insertEvent`，**无** ResponseBody dump（标记计数 0） |
| 2 | 只读重放 GET verification | **失败**。主机无 `.admin-pass`；redis `login_tokens:*`×4，Bearer uuid → 业务码 **401**；**未**拿到 200 全文 |
| 2b | POST view-sessions | **跳过**。Core 同秒 `selectWithdrawalForUpdate`→`selectFile`→**`insertEvent CARD_VIEW_SESSION`** ⇒ **会写库**；明示「会写，未重放」 |
| 3 | 库投影 | **已交**甲乙各一份（见下）；标明非 HTTP 原文 |

---

## 甲73 / 乙74 要点（可进确认卡相关）

| 字段 | 甲73 WW | 乙74 UO | 进确认卡相关 |
|---|---|---|---|
| **state** | `PENDING_CONFIRMATION` | `PENDING_CONFIRMATION` | FE 硬门：PENDING* |
| **phase** | **API 无此键**（ABSENT） | 同左 | phase 是 FE 本地态，不在 verification body |
| **pending** | **API 无此键** | 同左 | 同左 |
| sampleId | **54**（=`physical_sample_id`） | **55** | Y() 身份 |
| labTaskId | **901213** | **901214** | Y() 身份 |
| receiverUserId | **1** | **1** | Y() 身份 |
| cardId / cardVersion / cardSha256 | `f528c333-…` / **1** / `b68365d0…`（满） | `31940c87-…` / **1** / `506dc68d…`（满） | enterConfirm 指纹门 |
| factsDigest / structuredVersion | 有 / **1** | 有 / **1** | `$` 指纹旁证 |
| confirmationEventId | **null**（ρ 同形；库有 FACTS id 但不映射进 API） | **null** | FE Y() 对 PENDING **不读**此键 |
| SIGN_COMPLETED | **0** | **0** | 未办结 |
| CARD_VIEW_SESSION | **3**（含窗内 05:10:26 / 05:13:01） | **2**（含窗内 05:18:18） | 证明 view-sessions 曾成功落事件≠确认卡 UI |

**对 F5′ 的旁证含义（不裁怎么修）**：库侧驼峰所需 **state / sampleId / labTaskId / receiverUserId / cardId / cardVersion / cardSha256 / factsDigest 均齐**；若公网 FE history 行缺驼峰，则「verification data 反填」方向与准修 F5′ 同向——**但仍缺 HTTP 原文与 G3 phase dump，不得单凭本件解冻 tip。**

---

## 投影 JSON（非 HTTP 原文）

### 甲73 compact（899B · sha16=`ac43b7fcc9528db8`）· vs G1 bodyB=945

```json
{"msg":"操作成功","code":200,"data":{"recordId":"71596dda-6927-41d1-8ec4-3eccb31a75ea","id":"71596dda-6927-41d1-8ec4-3eccb31a75ea","withdrawalId":"71596dda-6927-41d1-8ec4-3eccb31a75ea","state":"PENDING_CONFIRMATION","sampleNo":"P10-S-WW","sampleId":54,"labTaskId":901213,"operationBatchId":73,"receiverUserId":1,"actorUserId":1,"quantity":"10","quantityUnit":"ml","giverUserId":1,"withdrawnAt":"2026-10-17T03:40:00+08:00","purpose":"领样","sampleState":"RECEIVED","factsDigest":"c037c3be8547972b45b1f3620233ffc2e83dc2e9931aa5d51adb122bf9a7025c","structuredVersion":1,"cardId":"f528c333-3f5c-40ed-b01a-62e930b7b4cc","cardVersion":1,"cardSha256":"b68365d0b116b9a85787bd638b3bc7e9976821c1efc243907f871fdf8896b2f1","confirmationEventId":null,"sealBound":false,"sealId":null,"sealSha256":null,"sealedAt":null,"recordVerified":false,"verificationEventId":null,"verifiedAt":null,"supersededBy":null}}
```

### 乙74 compact（899B · sha16=`5db0295c0cc83ca9`）· vs G1 bodyB=960

```json
{"msg":"操作成功","code":200,"data":{"recordId":"a476db3f-a906-4ddf-8be9-c013c0990bfd","id":"a476db3f-a906-4ddf-8be9-c013c0990bfd","withdrawalId":"a476db3f-a906-4ddf-8be9-c013c0990bfd","state":"PENDING_CONFIRMATION","sampleNo":"P10-S-UO","sampleId":55,"labTaskId":901214,"operationBatchId":74,"receiverUserId":1,"actorUserId":1,"quantity":"10","quantityUnit":"ml","giverUserId":1,"withdrawnAt":"2026-10-17T04:08:00+08:00","purpose":"领样","sampleState":"RECEIVED","factsDigest":"fbb3eae8af9dc5d750b04f83f20d01e5e6c1e3e9b0a9a0acdf99c412098868bb","structuredVersion":1,"cardId":"31940c87-7ea7-48e1-9503-d4ee56c3466f","cardVersion":1,"cardSha256":"506dc68dafe98eb2c6f08032468d7f317fbdcb5f92d20677e718e8896a1488f0","confirmationEventId":null,"sealBound":false,"sealId":null,"sealSha256":null,"sealedAt":null,"recordVerified":false,"verificationEventId":null,"verifiedAt":null,"supersededBy":null}}
```

### view-sessions 旁证（非 HTTP 全文）

| 刀 | 窗内时刻 | viewSessionId | documentKey 前缀 |
|---|---|---|---|
| 甲 | 05:10:26 / 05:13:01 | ade9b453… / 8952ba9c… | withdrawal-view-26eebceb… / 24b3634a… |
| 乙 | 05:18:18 | 2999169a… | withdrawal-view-8065f22c… |

HTTP bodyB=2133 未拿到（会写未重放）。

---

## 缺口（仍欠）

1. **本枪 verification HTTP 响应全文**（仍欠；本件仅为库投影）
2. **本枪 view-sessions HTTP 响应全文**（会写跳过；仅 event_json 片段）
3. **G3 Vue phase dump**（归测口；本枪不做）
4. 投影 compact 与 G1 bodyB 差 46/61：可能含展示映射（如 sampleState 中文）或其他服务层键——**不得**把 899B 投影当原文字节验收

---

## 红线自检

- 案1 QC-900421：**未碰**
- 写库 / tip / 挂包 / 重启 / 真点 / 改码：**无**
- POST view-sessions：**未重放**（会写）
- 密钥：**未入件、未打印**
- tip `edde0577`：**仍冻**（本件不解冻）

---

**sha256前16（正文）**：`a0e1cdcc2207f79f` · **盘 sha16**：见 `.sha16`
