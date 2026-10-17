# OPS-RO · 领样另线缺口 G1 · verification / view-sessions · 71596dda / a476db3f · 2026-10-17

- **窗**：2026-10-17 **05:07–05:18 CST**
- **主机**：lhins-hg459e98（VM-0-2-ubuntu）
- **日志**：`/var/log/nginx/access.log`（当日文件；窗内约 116 行）
- **本枪**：甲73 `71596dda-6927-41d1-8ec4-3eccb31a75ea` · 乙74 `a476db3f-a906-4ddf-8be9-c013c0990bfd`
- **通道**：STS→TAT 只读 grep；**禁写库 / 禁 tip / 禁挂包 / 禁重启 / 禁真点**；案1 QC-900421 未碰
- **INV**：`inv-ca0j500nxe`（主捞）· `inv-aa0j58gd68`（claim/confirm/pending 补捞）
- **RAW**：`/workspace/artifacts/OPS-RAW-领样-G1-nginx-verification-view-sessions-20261017.txt`
- **交件时刻**：2026-10-17 05:40:49 CST

---

## 一句话结论

窗内 **verification 有（7 行，全 200）**、**view-sessions 有（3 行，全 200）**：甲73 各 2 次成对出现（05:10:26 / 05:13:01），乙74 verification 连刷 5 次（05:15:59–05:18:18）且仅末次同秒带 view-sessions；claim/confirm/pending/lingyang 路径 **0 行**。

---

## 摘要表

| 类 | 有无 | HTTP 码 | 行数 | body 字节（典型） | 本枪 |
|---|---|---|---:|---|---|
| **verification** | **有** | **200** | 7 | 甲945 / 乙960 | 甲2 + 乙5 |
| **view-sessions** | **有** | **200** | 3 | 2133 | 甲2 + 乙1 |
| claim / confirm / pending / lingyang | **无** | — | **0** | — | — |

旁证（同窗、非焦点）：`GET /tlyf/lab/withdrawals/tasks/901213`（甲 list）与 `…/901214`（乙 list）有 200 命中；仅列旁证，非本焦点。

---

## 明细（URL / status / body_bytes / 时刻 CST）

| # | 时刻 CST | 方法 | URL | status | body_bytes | 本枪 |
|--:|---|---|---|---:|---:|---|
| 1 | 05:10:26 | GET | `/tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/verification` | 200 | 945 | 甲73 |
| 2 | 05:10:26 | POST | `/tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/view-sessions` | 200 | 2133 | 甲73 |
| 3 | 05:13:01 | GET | `/tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/verification` | 200 | 945 | 甲73 |
| 4 | 05:13:01 | POST | `/tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/view-sessions` | 200 | 2133 | 甲73 |
| 5 | 05:15:59 | GET | `/tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/verification` | 200 | 960 | 乙74 |
| 6 | 05:16:34 | GET | `/tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/verification` | 200 | 960 | 乙74 |
| 7 | 05:16:57 | GET | `/tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/verification` | 200 | 960 | 乙74 |
| 8 | 05:17:37 | GET | `/tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/verification` | 200 | 960 | 乙74 |
| 9 | 05:18:18 | GET | `/tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/verification` | 200 | 960 | 乙74 |
| 10 | 05:18:18 | POST | `/tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/view-sessions` | 200 | 2133 | 乙74 |

---

## 原始日志行摘录（IP 脱敏；Referer 已去 https 串）

```
x.x.x.x - - [17/Oct/2026:05:10:26 +0800] "GET /tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/verification HTTP/1.1" 200 945 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
x.x.x.x - - [17/Oct/2026:05:10:26 +0800] "POST /tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/view-sessions HTTP/1.1" 200 2133 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
x.x.x.x - - [17/Oct/2026:05:13:01 +0800] "GET /tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/verification HTTP/1.1" 200 945 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
x.x.x.x - - [17/Oct/2026:05:13:01 +0800] "POST /tlyf/lab/withdrawals/71596dda-6927-41d1-8ec4-3eccb31a75ea/view-sessions HTTP/1.1" 200 2133 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
x.x.x.x - - [17/Oct/2026:05:15:59 +0800] "GET /tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/verification HTTP/1.1" 200 960 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
x.x.x.x - - [17/Oct/2026:05:16:34 +0800] "GET /tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/verification HTTP/1.1" 200 960 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
x.x.x.x - - [17/Oct/2026:05:16:57 +0800] "GET /tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/verification HTTP/1.1" 200 960 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
x.x.x.x - - [17/Oct/2026:05:17:37 +0800] "GET /tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/verification HTTP/1.1" 200 960 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
x.x.x.x - - [17/Oct/2026:05:18:18 +0800] "GET /tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/verification HTTP/1.1" 200 960 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
x.x.x.x - - [17/Oct/2026:05:18:18 +0800] "POST /tlyf/lab/withdrawals/a476db3f-a906-4ddf-8be9-c013c0990bfd/view-sessions HTTP/1.1" 200 2133 "-" "Mozilla/5.0 ... Chrome/155.0.0.0 Safari/537.36"
```

---

## 领样相关路径同窗并列

| 关键词 | 窗内行数 |
|---|---:|
| claim | **0** |
| confirm | **0** |
| pending | **0** |
| lingyang / 领样 | **0** |
| withdrawals（含 tasks/verification/view-sessions 等） | 有（见上；另 tasks/901213、901214） |

---

## 红线自检

- 案1 QC-900421：**未碰**
- 写库 / tip / 挂包 / 重启 / 真点：**无**
- 密钥：**未入件、未打印**（仅 STS 连 TAT）

---

**sha256前16**：`055fcb7cecda1c80`
