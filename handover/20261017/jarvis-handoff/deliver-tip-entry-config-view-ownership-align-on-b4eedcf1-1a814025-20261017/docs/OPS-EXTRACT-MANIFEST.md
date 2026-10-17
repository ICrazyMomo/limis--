# MANIFEST · EXTRACT EntryBatchServiceImpl · FINAL `b4eedcf1` · for 准修 `1a814025` · 20261017

**结论：** EXTRACT_OK · 现盘 Core FINAL sha16 ≡ `b4eedcf104953d93` · PID=`3284790` · Impl sha16 ≡ `5b05565b4f7e0250` **≡ 上次 EXTRACT KEEP**（乙 tip `0a6ac4d9` 只改 Receipt 未动 Impl）。

| 项 | 值 |
|---|---|
| 时刻 | 2026-10-17 08:29 Asia/Shanghai |
| 源 jar | `/data/lanes/core16-bff15-runtime-switch-20261009/controlled/stage/core16/lei-admin.jar` |
| FINAL 全 sha256 | `b4eedcf104953d9381a096d61f86d79843b74b886fa8ebcda1ebd9290ab3d644` |
| FINAL sha16 | `b4eedcf104953d93` |
| Core PID | `3284790`（≡ AFTER 观察） |
| CAPTCHA | `200` |
| nested `lei-system-1.0.0.jar` sha16 | `613c0f72ad1f131e` |
| Impl ≡ `5b05565b` | **yes** |
| TAT extract | `inv-8a0q240xhu` |
| TAT COS PUT | `inv-8a0q390qg3`（HTTP200） |
| tgz | `EntryBatchServiceImpl-extract-20261017.tgz` sha256=`d07d8da64a3fbd1404db47d2e470633db52b3a80bcb14bdf32b790d40d38cacf` |
| 受众 | Claude程序员-mod（准修 `1a814025` · 叠钉 `1d3f1cab` · 基 FINAL `b4eedcf1` 出 tip `deliver-tip-entry-config-view-ownership-align-on-b4eedcf1-1a814025-20261017/`） |
| 红线 | 只读 EXTRACT；禁 tip；禁 LIVE；禁写库；禁动甲 FE `4fea5d72`；案1不动；密钥未进 artifacts |

## 类清单（Impl + nested $）

| 相对路径（classes/） | size | sha16 | sha256 |
|---|---|---|---|
| `com/lei/system/service/impl/EntryBatchServiceImpl.class` | 66015 | `5b05565b4f7e0250` | `5b05565b4f7e0250191028d48ac7192c0008cb731022b8b25a90f23ad66a81ed` |
| `com/lei/system/service/impl/EntryBatchServiceImpl$1.class` | 897 | `7d8ecd40ab4d305f` | `7d8ecd40ab4d305f16990f3b887f4697289dc7227c3124fea4ab23f4b86cf6f1` |
| `com/lei/system/service/impl/EntryBatchServiceImpl$2.class` | 863 | `81c45de8687d1e66` | `81c45de8687d1e66097a089de909a768869e671e4df328ff9ddf8dc32a3802c6` |
| `com/lei/system/service/impl/EntryBatchServiceImpl$Resolved.class` | 2346 | `7e27c7435078cdaf` | `7e27c7435078cdaf1624269b52fdd45012d38021379afa1665700cf173f5d46d` |
| `com/lei/system/service/impl/EntryBatchServiceImpl$TaskContext.class` | 3272 | `41b2753b1bcc9c34` | `41b2753b1bcc9c34b3fcce1d15c2b15a27eb2f3ab356b79969a5fbda52d5131e` |

同字节镜像：`classes/nested/com/lei/system/service/impl/…`（zip 入口 `BOOT-INF/lib/lei-system-1.0.0.jar!…`）。

## 对账（vs 上次 EXTRACT FINAL`16751394` / AFTER tip`0a6ac4d9`）

| 项 | 上次 / AFTER KEEP | 现盘 |
|---|---|---|
| Impl | `5b05565b4f7e0250` | `5b05565b4f7e0250` ≡ |
| $1 | `7d8ecd40ab4d305f` | `7d8ecd40ab4d305f` ≡ |
| $2 | `81c45de8687d1e66` | `81c45de8687d1e66` ≡ |
| $Resolved | `7e27c7435078cdaf` | `7e27c7435078cdaf` ≡ |
| $TaskContext | `41b2753b1bcc9c34` | `41b2753b1bcc9c34` ≡ |
| FINAL | AFTER `b4eedcf1` | `b4eedcf1` ≡（未漂） |

## 方法 / strings 闸（机内，无密钥）

| 类 | 关键 |
|---|---|
| EntryBatchServiceImpl | `resolveDraft`✓ · `findActiveDraft`✓ · `fileKey`✓ · `sys_lab_entry_readback`✓ · `createUser`✓ · `config`✓ · `view`✓ · `edit`✓ |
| javap | `Map resolveDraft(...)` · `OfficeFileConfigVo config(String, String)` · `Map preview(...)` |

## 目录

- `classes/` — 原字节（flat + nested 镜像）
- `javap/` — `*.javap-p.txt` + `*.javap-c-p.txt`
- `strings/` — needles 命中
- `meta/` — FINAL/PID/IMPL gate / nested sha
- `scan/` — jar 扫表
- `SHA256SUMS.txt`
- `EntryBatchServiceImpl-extract-20261017.tgz`
- `MANIFEST.md` + `MANIFEST.md.sha16`

挂上≠PASS。本交件仅供 Claude-mod 叠基 `b4eedcf1` 编 tip；**禁 LIVE**。

## sha16
c9ac2a618cbb5943
