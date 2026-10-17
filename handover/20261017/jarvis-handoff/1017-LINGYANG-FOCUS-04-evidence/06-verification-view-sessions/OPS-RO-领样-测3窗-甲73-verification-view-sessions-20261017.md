# OPS-RO · 领样测3窗 · 甲73 verification / view-sessions · 2026-10-17

- **窗（主）**：2026-10-17 **06:47–06:50 CST**（Asia/Shanghai）
- **窗（宽）**：06:46–06:51 CST（±1min；边缘未切到新行，主结论钉主窗）
- **主机**：lhins-hg459e98（VM-0-2-ubuntu）
- **日志**：`/var/log/nginx/access.log`（当日文件；主窗约 285 行 / 宽窗约 343 行）
- **本枪**：甲73 `71596dda-6927-41d1-8ec4-3eccb31a75ea`（未扫乙74）
- **通道**：STS→TAT 只读 grep + 可选只读 SELECT；**禁写库 / 禁 tip / 禁重放 POST view-sessions / 禁 curl 业务写接口 / 禁改盘 / 禁回滚**
- **案1** QC-900421：**未碰**
- **edde0577**：**禁回滚维持**（本件不碰 tip / 不热换 / 不回滚）
- **INV**：`inv-8a0mfw08xh`（nginx）· `inv-8a0mghg1ka`（event SELECT）· `inv-ca0mg80gjt`（表名试探失败后改 `lab_withdrawal_event`）
- **RAW**：`OPS-RAW-领样-测3窗-nginx-verification-view-sessions-20261017.txt` · `OPS-RAW-领样-测3窗-CARD_VIEW_SESSION-20261017.txt`
- **叠 DIAG**：`DIAG-研发-领样-edde0577-LIVE后VERIFY-FAIL-未进确认卡-F5prime端到端-20261017.md`
  - **盘 sha16（.sha16 为准）**：`6f8c5203142213b2`
  - **研发口头曾提**：`597a25cc` → **以盘件为准；口头号作废对照**
- **RESULTS**：`RESULTS-测3-领样-edde0577-甲73-确认卡未挂-20261017.md` 盘 sha16=`0947b6b68fc94230`（与令一致）
- **G1 早窗对照（非本窗）**：`OPS-RO-领样-G1-verification-view-sessions-71596dda-a476db3f-20261017.md`
- **交件时刻**：2026-10-17 07:01:05 CST

---

## VERDICT

**`RO_OK_PAIRED`**

主窗 verification **×1** · view-sessions **×1** · **成对**（同秒邻行：06:48:14 GET → 06:48:15 POST）；均可证「点继续后当次发出了 view-sessions」。不挡 FAIL 定性（进确认卡/旁注仍属 FE）。

---

## 一句话结论

测3 窗甲73：**GET verification 与 POST view-sessions 成对出现**（200/945 + 200/2133）。库投影同秒新增 `CARD_VIEW_SESSION`（request_id=`948adc57-…`）。可证明当次点击发出了 view-sessions；**仍不解释**「未进确认卡 / 无 FAIL 旁注」——不挡 RESULTS FAIL。G1 早窗成对模式再现于测3 窗（次数 1 对 vs G1 甲 2 对）。

---

## 摘要表

| 类 | 有无 | HTTP | 行数 | body_bytes | 时刻 CST | 本枪 |
|---|---|---|---:|---:|---|---|
| **verification** | **有** | **200** | **1** | **945** | 06:48:14 | 甲73 |
| **view-sessions** | **有** | **200** | **1** | **2133** | 06:48:15 | 甲73 |
| 成对？ | **是** | — | 1×1 | — | 间隔 ≈1s | — |

宽窗（±1min）无额外 verification / view-sessions 行。

---

## 明细（时刻 / method / URL / status / body_bytes）

| # | 时刻 CST | 方法 | URL | status | body_bytes | request_id（nginx） |
|--:|---|---|---|---:|---:|---|
| 1 | **06:48:14** | GET | `/tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/verification` | **200** | **945** | access 标准 combined **无** request_id 字段 |
| 2 | **06:48:15** | POST | `/tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/view-sessions` | **200** | **2133** | 同上；库侧见下 |

---

## 能否证明「点继续后当次发出了 view-sessions」？

**能。**

1. RESULTS 测3 ≈06:47–06:50 点「继续本次领用」→ verification 200 `PENDING_CONFIRMATION`
2. nginx 主窗仅此一对：verification@06:48:14 → view-sessions@06:48:15（同 UA/同 IP 族、同 wd）
3. 库 `lab_withdrawal_event` 同秒 `CARD_VIEW_SESSION` @06:48:15.111（与 POST 对齐）

⇒ 当次点击路径 **已发出** POST view-sessions 且 **200 落库**。  
⇒ RESULTS 旁证 `PENDING_VIEW`/`canConfirm=false` **可升为当次硬证（发出+200）**；**仍 ≠** 确认卡 UI / F5 收口 PASS。

---

## 可选：CARD_VIEW_SESSION（只 SELECT）

| 项 | 值 |
|---|---|
| 表（实名） | `lab_withdrawal_event`（令文 `lab_sample_withdrawal_event` 为别称；库无后者） |
| 窗内新增？ | **是 ×1** |
| id / viewSessionId | `18343712-00f9-4215-8863-1a4df8d2ebc9` |
| request_id | `948adc57-7d04-4bdf-8f58-35129c613b1b` |
| occurred_at | **2026-10-17 06:48:15.111** CST |
| event_json 摘要 | `documentKey=withdrawal-view-598c8ac1…` · `viewSessionId=18343712-…` |
| 同窗其它 event_type | **仅** CARD_VIEW_SESSION（无 DOCS_* 同窗） |

**禁 INSERT / 禁重放 POST**：遵守。

---

## 原始日志行摘录（IP 脱敏）

```
x.x.x.x - - [17/Oct/2026:06:48:14 +0800] "GET /tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/verification HTTP/1.1" 200 945 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
x.x.x.x - - [17/Oct/2026:06:48:15 +0800] "POST /tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/view-sessions HTTP/1.1" 200 2133 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
```

---

## 与 G1 早窗对照（非本窗）

| | G1（05:07–05:18） | 测3（06:47–06:50） |
|---|---|---|
| 甲 verification | ×2 @05:10:26 / 05:13:01 · 200/945 | **×1** @06:48:14 · 200/945 |
| 甲 view-sessions | ×2 同秒成对 · 200/2133 | **×1** @06:48:15 · 200/2133 |
| 成对模式 | 有 | **有（再现）** |
| 本窗定性 | 早窗另线 | **测3 当次硬证** |

---

## 对 DIAG / FAIL 的边界

- **补齐** DIAG §4 欠运维 RO 两问（成对 + 可选 CARD_VIEW_SESSION）
- **不挡** FAIL：未进确认卡 / 无 F5‴ 旁注仍成立；接口 200 ≠ PASS；挂上 ≠ PASS
- **禁 tip / 禁回滚 edde0577**

---

## 红线自检

- 案1 QC-900421：**未碰**
- 写库 / tip / 改盘 / 回滚 / 重放 POST view-sessions / curl 业务写：**无**
- verification：**未**主动打业务接口；以 access log 为准
- 密钥：**未入件、未打印**（仅 STS 连 TAT；ticket 仅 /tmp 私区）

---

**VERDICT**：`RO_OK_PAIRED`  
**sha256前16**：见同名 `.sha16`
