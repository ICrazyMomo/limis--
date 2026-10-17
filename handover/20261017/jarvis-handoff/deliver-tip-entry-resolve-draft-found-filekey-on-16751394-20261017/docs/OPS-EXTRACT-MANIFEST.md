# OPS-EXTRACT · EntryBatch resolveDraft · FINAL `16751394` · 2026-10-17

**结论先行：** 现网 Core `lei-admin.jar` 只读抽类 **EXTRACT_OK**。FINAL 全 sha256 ≡ `167513940fcd1f9f…`（短号 `16751394`）· PID=`3204604` · CAPTCHA=`200`。目标 class（Controller.resolveDraft / ServiceImpl.resolveDraft / Receipt.findActiveDraft / IEntryBatchService.resolveDraft）字节+javap+strings 已回盒。可选旁证 `EntryBatchSourceReader` **outer 缺**（jar 内无此 entry）。禁改挂载 / 禁 tip / 禁自 LIVE / 禁动甲 FE `4fea5d72` / 密钥未进件。

## 元
| 项 | 值 |
|---|---|
| 时刻 | 2026-10-17 ≈07:51 Asia/Shanghai |
| 源 jar | `/data/lanes/core16-bff15-runtime-switch-20261009/controlled/stage/core16/lei-admin.jar` |
| FINAL 全 sha256 | `167513940fcd1f9f41bdec5bfd5f1615524735f870d9b74643168037f3fd3654` |
| FINAL 短号 | `16751394`（≡ `167513940fcd1f9f`） |
| Core PID | `3204604` |
| CAPTCHA | `200` |
| nested `lei-system-1.0.0.jar` sha16 | `758829e0e62b0bed` |
| TAT 抽 | `inv-aa0nx6g8gd` |
| TAT COS PUT | `inv-ca0nxeg6s8`（HTTP200） |
| tgz | `entry-resolve-draft-extract-20261017.tgz` sha256=`618fcf2a0c8e6401bced97c20132dbd4e1517c5bb2cc0d6cdc1c78c40660277f` |
| 受众 | Claude程序员-mod（准修 `e2386021` · 叠 `7b480577` · 卡件 sha16=`7d7fa673`） |
| 红线 | 只读 EXTRACT；禁 tip；禁 LIVE；禁改挂；禁写库；禁动甲 FE；密钥未进 artifacts |
| 别名目录 | `OPS-EXTRACT-entry-resolve-draft-FINAL16751394-20261017/` → 本目录同内容（ln） |

## 类清单（主修）
| 相对路径（交件 classes/） | size | sha16 | sha256 |
|---|---|---|---|
| `com/lei/web/controller/system/EntryBatchController.class` | 6058 | `1fd141dc78ab8165` | `1fd141dc78ab8165fe00a70065fb3010a2f6e923012587f1ad3a479918e08302` |
| `nested/com/lei/system/service/impl/EntryBatchServiceImpl.class` | 66015 | `5b05565b4f7e0250` | `5b05565b4f7e0250191028d48ac7192c0008cb731022b8b25a90f23ad66a81ed` |
| `nested/com/lei/system/service/impl/EntryBatchServiceImpl$1.class` | 897 | `7d8ecd40ab4d305f` | `7d8ecd40ab4d305f16990f3b887f4697289dc7227c3124fea4ab23f4b86cf6f1` |
| `nested/com/lei/system/service/impl/EntryBatchServiceImpl$2.class` | 863 | `81c45de8687d1e66` | `81c45de8687d1e66097a089de909a768869e671e4df328ff9ddf8dc32a3802c6` |
| `nested/com/lei/system/service/impl/EntryBatchServiceImpl$Resolved.class` | 2346 | `7e27c7435078cdaf` | `7e27c7435078cdaf1624269b52fdd45012d38021379afa1665700cf173f5d46d` |
| `nested/com/lei/system/service/impl/EntryBatchServiceImpl$TaskContext.class` | 3272 | `41b2753b1bcc9c34` | `41b2753b1bcc9c34b3fcce1d15c2b15a27eb2f3ab356b79969a5fbda52d5131e` |
| `nested/com/lei/system/service/impl/EntryBatchReceiptService.class` | 37062 | `8301b6618420a538` | `8301b6618420a53822ed008aa8f10d36d5d44f8e83c8f912edab91efe60de985` |
| `nested/com/lei/system/service/impl/EntryBatchReceiptService$1.class` | 849 | `f64de1c768d0fd40` | `f64de1c768d0fd408e3972afed6b42df6e6f91d3031dfb5ef98e9dc7716dd62b` |
| `nested/com/lei/system/service/impl/EntryBatchReceiptService$RowWriter.class` | 486 | `0e3b10c6bd82ac5b` | `0e3b10c6bd82ac5b5b7550783736bc14a954029c4baf9085df3c02aa4943af35` |
| `nested/com/lei/system/service/IEntryBatchService.class` | 2113 | `c608a4216057ee2d` | `c608a4216057ee2d888e411307f4e03b4351300c419fcab3824ef8cad17aa761` |

## 旁证 / 连带（nested domain 等）
| 相对路径 | size | sha16 |
|---|---|---|
| `nested/com/lei/system/domain/EntryBatchHeaderCell.class` | 7541 | `61c6db6721f8d56f` |
| `nested/com/lei/system/domain/EntryBatchRegion$Column.class` | 1885 | `6ff9dd9afe5030fc` |
| `nested/com/lei/system/domain/EntryBatchRegion.class` | 4746 | `bfd8d4b7abf10595` |
| `nested/com/lei/system/service/impl/EntryBatchWorkbook.class` | 24725 | `b64a964320d1d3ae` |

## 方法 / strings 闸（机内）
| 类 | 关键字符串 / javap |
|---|---|
| EntryBatchController（outer） | `resolve-draft`✓ · `resolveDraft`✓ · `fileKey`✓ · javap `AjaxResult resolveDraft(Map)` |
| EntryBatchServiceImpl（nested） | `resolveDraft`✓ · `findActiveDraft`✓ · `fileKey`✓ · `sys_lab_entry_readback`✓ · javap `Map resolveDraft(...)` |
| EntryBatchReceiptService（nested） | `findActiveDraft`✓ · `entry_batch_source`✓ · `found`✓ · `fileKey`✓ · `sys_temp_file`✓ · `sys_lab_entry_readback`✓ · javap `Map findActiveDraft(...)` |
| IEntryBatchService（nested） | `resolveDraft`✓（接口声明） |
| EntryBatchSourceReader（outer 可选） | **MISSING**（FAT 无该 entry） |

## 目录
- `classes/` — outer `com/lei/web/controller/system/…` + nested `nested/com/lei/system/…`
- `javap/` — 每类 `*.javap-p.txt` + `*.javap-c-p.txt`
- `strings/` — needles 命中摘录
- `meta/` — FINAL/PID/CAPTCHA/extracted.json/nested sha
- `scan/` — EntryBatch jar 扫表
- `SHA256SUMS.txt` — 本包文件指纹
- `entry-resolve-draft-extract-20261017.tgz` — 机内打包原件回传
- `MANIFEST.md` + `MANIFEST.md.sha16`

## 准修叠
准修 `e2386021` · 求准修叠 `7b480577` · DIAG `558eaa2f` · RESULTS 测3 `da091213` · 卡停刀 sha16=`7d7fa673` · 甲 FE `4fea5d72` 禁动

挂上≠PASS。本交件仅供 Claude-mod 编乙 tip（PRE≡FINAL `16751394`）。

## sha16
`613574d703eefb2c`
