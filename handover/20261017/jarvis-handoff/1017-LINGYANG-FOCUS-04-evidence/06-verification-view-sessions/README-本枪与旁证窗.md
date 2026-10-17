# verification × view-sessions · 本枪 vs 旁证

## 本枪（F5⁶ · 08:34–08:39 Asia/Shanghai · RESULTS `b3fa54f1`）

RESULTS 内嵌 Network（点后当次 · 成对 · 禁 token）：

| 请求 | 发出？ | 摘要 |
|---|---|---|
| GET `…/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/verification` | **有** | HTTP **200**（响应体本枪未读，无 state/canConfirm 可贴） |
| POST 同 withdrawal `/view-sessions` | **有** | HTTP **200**（响应体本枪未读） |

- **缺**：本枪 08:34 窗专用 nginx RAW / HAR / 响应体全文
- 同 withdrawal id 与前枪 F5⁵ 一致；前枪曾读到 verification `state=PENDING_CONFIRMATION`、view-sessions `state=PENDING_VIEW`/`canConfirm=false`

## 旁证（同 withdrawal · **更早窗** · 非本枪时刻）

| 件 | 窗 | 说明 |
|---|---|---|
| `OPS-RO-领样-测3窗-甲73-verification-view-sessions-20261017.md` | 06:47–06:50 | 成对 200；叠 edde/F5prime 线；**非** 08:34 F5sixth 枪 |
| `OPS-RAW-领样-测3窗-nginx-…` / `…CARD_VIEW_SESSION…` | 同上 | nginx/事件 RAW |
| `OPS-RO-领样-G1-…71596dda…` + G1 RAW | 更早 | 同 id 成对模式对照 |
| `OPS-RO-领样-G2-…响应全文…` | G2 | **有** verification/view-sessions 响应全文（旁证体，非本枪） |

采信口径：本枪 FAIL 以 RESULTS`b3fa54f1` + 裁`ffd0b7c2` 为准；旁证窗 **不得** 用来自扩本枪 PASS。
