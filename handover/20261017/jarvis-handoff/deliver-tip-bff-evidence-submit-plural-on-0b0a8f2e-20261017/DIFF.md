# DIFF · BFF tip · point-submit → Core plural evidence-packages · 20261017

基线 PRE：现网 EXTRACT `PointEvidenceController.class` sha16=`fab1cbbed675e551`（叠 BFF FINAL `0b0a8f2e`）
本 tip PATCHED：`b987a3f4c0aea0be`（全长 `b987a3f4c0aea0bee448ba28ae8af7366df160cfe7ea6ad0bd4405a6b2bc659e`）
改类：**仅** `com.lei.mobile.evidence.PointEvidenceController`
禁：②③、photos502、案1、自 LIVE、自挂、端改面

## 刀面（一句话）
PUB 仍挂 `POST /api/mobile/v1/task-lists/{task}/points/{point}/evidence-package/submit`；
**仅** submit 的 BFF→Core INT 由同形单数+points
`…/task-lists/{tl}/points/{p}/evidence-package/submit`
改为 Core 权威复数口
`…/internal/mobile/v1/task-lists/{taskListId}/evidence-packages/submit`（无 points）；
入参 taskListId 权威；点位由 Core Gate/投影认；回执适配回 point-v2 `POINT_SUBMITTED`（端不改面）。

## A · submit INT 改打复数口
- INT 合同头：`evidence-package-v1`（对齐 `EvidencePackageCoreClient` / Core `MobileInternalEvidencePackageController`）
- INT body：`{"expectedVersion":0}`（Core 权威体；点位 INPUT 仍先 `validateInput`）
- URI：`{base}/internal/mobile/v1/task-lists/{taskListId}/evidence-packages/submit`
- 响应头验收：`X-Mobile-Internal-Contract-Version=evidence-package-v1`

## B · Core 回执 → POINT_SUBMITTED
- Core keys：`outcome,taskListId,samplingPointId,status,version,receiptCount,submittedAt,packageDigest`（outcome/status=`SUBMITTED`）
- 适配后 PUB keys：`outcome,taskListId,samplingPointId,planId,planVersion,version,receiptCount,submittedAt,packageDigest,requestId`
- `outcome=POINT_SUBMITTED`；`planId`/`planVersion` 取自已校验点位 INPUT；`requestId` 取自请求头
- 身份：`taskListId`/`samplingPointId` 须与路径一致

## C · 未改
- context / submissions GET：仍走旧 INT `…/points/{p}/evidence-package/…`
- PUB 映射与合同头 `evidence-package-point-v2` 不变
- `EvidencePackageCoreClient` / `EvidencePackageSubmitController` **字节未改**（本 tip 复用其 URI/合同约定，未覆写这两类）

## 负例规避（N1–N7）
| # | 负例 | 本 tip 如何规避 |
|---|---|---|
| N1 | 仅改端文案，BFF 仍打 points 单数 INT | class 常量池含 `/evidence-packages/submit`；submit 分支不再拼 `/points/`+`/evidence-package/`+`submit` |
| N2 | 只把 503 改成软失败、无落库 | INT 进 Core Ctl 权威 submit；落库由 Core Service；本 tip 不吞失败为假成功 |
| N3 | 拆掉点位口逼端改权威口 | `@RequestMapping` 仍为点位口；Android 合同不变 |
| N4 | 顺手改 photos502/Gate/案1/tl189/1606 | 只改 PointEvidenceController；OVERWRITE 单行 |
| N5 | 叠基写成 DIAG `1b932745` | 叠基钉 **0b0a8f2e**（BFF FINAL）；HANDOFF/tag 写明 |
| N6 | 覆写清单漏列 | 见 `OVERWRITE-LIST.md`；包内挂上文件仅本 class |
| N7 | 无 DIAG 叠准修即 tip / 自 LIVE | 叠准修盘 `43749bb3`+BRIEF `18afed28`；**未自 LIVE** |

## 关键点（源）
- 新增常量：`CORE_PACKAGE_CONTRACT`、`TIP_MARKER`、`CORE_RECEIPT`
- `exchange`：`bl==true`（submit）独立分支 → 复数 URI + v1 合同 + 适配回执
- 新增 `adaptCoreSubmitReceipt(...)`
- 非 submit 路径保持原 `/points/` + `/evidence-package/` + GET
