# RD-VERIFY · 报告旁路 tip demo-bypass-qc-block-report-audit · 准修 `04b85f9b` · tgz `eb1a4426` · on FINAL `b4eedcf1` · 2026-10-17

> 角色：limis-研发侧 **RD-VERIFY 文书**（**静态-only**；禁 tip LIVE；禁改 tip 刀面）· Asia/Shanghai  
> 交件：`/workspace/artifacts/deliver-tip-demo-bypass-qc-block-report-audit-HT2026101606-04b85f9b-20261017/`  
> tgz=`core-tip-demo-bypass-qc-block-report-audit-HT2026101606-04b85f9b-20261017.tgz` · 宣称 sha16=`eb1a4426f542eba9`  
> ORIG Gate=`bb4d9ec345d066be` → NEW=`e7d2f3b18c2fe075`  
> 叠基 FINAL=`b4eedcf1` · 短sha=`0955febf` · tag=`tip/0955febf-on-b4eedcf1` · 分支=`tip/demo-bypass-qc-block-report-audit-HT2026101606-04b85f9b-20261017`  
> 准修=`04b85f9b81fb907b` · EXTRACT MANIFEST=`5a764206676f82f4`  
> 墙钟：2026-10-17 09:09 Asia/Shanghai

**结论：PASS。** 十项静态核齐；可交产品放行 → 运维 LIVE。禁自 LIVE；挂上≠PASS。SELFTEST 为盒内 javap 旁证（**静态-only**，无干净机/现网自测）。

---

## 核项逐条（缺一不可）

### 1. 准修章存在且 sha16 核齐；刀面与章一致 — **PASS**

| 源 | 实测 |
|---|---|
| 章路径 | `/workspace/artifacts/PRODUCT-STAMP-准修-演示-取消质控未过完拦报告审核闸-HT2026101606-20261017.md` |
| canon=`sha256(文件[:rfind("## sha16")])[:16]` | `04b85f9b81fb907b` |
| 文内 `## sha16` | `04b85f9b81fb907b` ≡ |
| `.sha16` sidecar | `04b85f9b81fb907b` ≡ |
| tip `stamps/` 副本 | `diff -q` ≡ 章盘 |

**刀面 vs 章 §②：** tip 对 `reportSignEntryBlock` / `reportSignEntryBlockByPool` 插 **admin ∧（HT2026101606 ∨ orderId 900354 ∨ QTP57 ∨ labPoolId 901082）** 早退 `null`，整道旁路采样+实验（不进 `inspectCase`/`inspectPool`→`inspectSource`）。与准修「admin∧本主单取消质控未过完拦报告整闸（采样+实验）；可回滚；禁扩非本单；废前票`65834a8c`采样不跳口径」一致。HANDOFF/ROLLBACK 含恢复法。

### 2. ORIG 字节 ≡ EXTRACT Gate class — **PASS**

| 物 | sha16 | size | 判 |
|---|---|---|---|
| tip `orig/QltTaskQualityGate.class` | `bb4d9ec345d066be` | 10162 | — |
| tip `orig/ORIG-QltTaskQualityGate-from-b4eedcf1.class` | `bb4d9ec345d066be` | 10162 | ≡ |
| EXTRACT `classes/…/QltTaskQualityGate.class` | `bb4d9ec345d066be` | 10162 | **cmp 字节 ≡ tip orig** |
| EXTRACT `classes/nested/…/QltTaskQualityGate.class` | `bb4d9ec345d066be` | 10162 | ≡同刀镜像 |
| EXTRACT MANIFEST | `5a764206676f82f4`（canon≡sidecar） | — | Gate≡`bb4d9ec3` · FINAL`b4eedcf1` |

路径与 HANDOFF 一致：nested `BOOT-INF/lib/lei-system-1.0.0.jar!/com/lei/system/service/impl/QltTaskQualityGate.class`（OUTER 无 Gate）。全 sha256 ORIG=`bb4d9ec345d066be9d7e0ec3e23e48f2ac145e65c641fd48f44e3e8023f55be7`。

### 3. NEW class sha16 ≡ `e7d2f3b18c2fe075`；javap 可见旁路谓词；非全局永久关闸 — **PASS**

| 物 | sha16 | size |
|---|---|---|
| `classes/…/QltTaskQualityGate.class` | `e7d2f3b18c2fe075` | 10481 |
| `nested-inject/…/QltTaskQualityGate.class` | `e7d2f3b18c2fe075` | ≡ |
| `pkg/BOOT-INF/lib-overlay/lei-system/…/QltTaskQualityGate.class` | `e7d2f3b18c2fe075` | ≡ |
| major | **52**（ORIG/PATCH 同） | — |

全 sha256 NEW=`e7d2f3b18c2fe0752c84049cf6e9998258909e9309edbb0b37a800b353e3d67f`。

**javap -c 旁路谓词（仅两入口；`inspectSource` 无 isAdmin）：**

1. `reportSignEntryBlock(QltReportCase)`：`SecurityUtils.isAdmin(getUserId())` ∧（`HT2026101606`.equals(orderNo) ∨ orderId==**900354L**）→ `aconst_null; areturn`；否则落 ORIG `inspectCase`。
2. `reportSignEntryBlockByPool(Long)`：① poolId==**57L** ∧ admin → null；② map 后 admin ∧ labPoolId==**901082L** → null；否则落 ORIG `inspectPool`。

非匹配仍走 ORIG 拦截文案「现在还不能办理报告签发相关操作，请先完成采样/实验数据质控」→ **非全局永久关闸**。与 DIFF/BRIEF/SELFTEST 一致。

### 4. tgz 实际 sha256[:16] ≡ `eb1a4426f542eba9` — **PASS**

| 源 | 实测 |
|---|---|
| 盘上 tgz 文件 sha256 | `eb1a4426f542eba909b62c980f3bbd1b44ddb4332a4aa92f5b6843e8d6026602` |
| 算法（本包惯例） | **sha256(tgz 文件字节)[:16]** ≡ `SHA16-TGZ.txt` / `stamps/TGZ.sha16` / `TGZ.sha256` 前 16 |
| `SHA16-TGZ.txt` | `eb1a4426f542eba9` ≡ |
| `TGZ.sha256` | 全长 ≡ 盘上 |
| HANDOFF | 权威指针 → `SHA16-TGZ.txt` / `stamps/TGZ.sha16` |

### 5. 可追溯 GATE：HANDOFF/GIT-TRACE 列齐；tip-git 实存 tag/分支 — **PASS**

| 项 | HANDOFF / GIT-TRACE / stamps | tip-git 实测 |
|---|---|---|
| 分支 | `tip/demo-bypass-qc-block-report-audit-HT2026101606-04b85f9b-20261017` | `refs/heads/…` ≡；HEAD |
| 短sha | `0955febf`（全长 `0955febf3227aef2ca5114808be36120b824c624`） | `git rev-parse HEAD` ≡ |
| 叠基 FINAL | `b4eedcf1` | GIT-TRACE PRE=`b4eedcf1`；stamps/PRE ≡ |
| tag | `tip/0955febf-on-b4eedcf1` | annotated tag 存在；`^{}` peel → `0955febf…` ≡ HEAD |

### 6. HANDOFF 含恢复法 — **PASS**

HANDOFF §恢复法 + `ROLLBACK.md`：用 ORIG class（sha16=`bb4d9ec345d066be`）覆回 nested `lei-system-1.0.0.jar` 同路径成员并重启；无独立配置总开关；AFTER 期望再出 Tc。还债 D1 口径齐。

### 7. 全量覆写清单 — **PASS**

`全量覆写清单.md` 列：

| 目标 | 动作 | 指纹 |
|---|---|---|
| nested `BOOT-INF/lib/lei-system-1.0.0.jar` → `com/lei/system/service/impl/QltTaskQualityGate.class` | PATCH 覆写 | ORIG `bb4d9ec345d066be` → PATCH `e7d2f3b18c2fe075` |

明示：无其他成员；无 OUTER；无 XML；无 FE；领样不碰。挂载面 copies（classes / nested-inject / pkg lib-overlay）同字节 NEW；清单目标=现网 nested 单成员，**未漏列**。

### 8. 未动 FE / 领样；未自 LIVE — **PASS**

- tgz/目录无 `.vue` / FE `dist` / 领样相关刀面（仅 git hook 样例名 `pre-receive.sample` 误触检索，非业务领样）。
- BRIEF/HANDOFF/OPS-MOUNT/红线：**禁自 LIVE**；**禁 FE**；**禁领样**；本 VERIFY 只读，未挂未写库。

### 9. 「卡-缺EXTRACT…」与现实 EXTRACT_OK — **注明 · 不影响交件**

目录存 `卡-缺EXTRACT-QltTaskQualityGate-FINAL-b4eedcf1.md`，正文已标 **VOID·EXTRACT 已交**（指向 `deliver-extract-QltTaskQualityGate-FINAL-b4eedcf1-for-04b85f9b-20261017` · ORIG `bb4d9ec3`）。与现实 EXTRACT_OK **无矛盾**（卡已自废）。VERIFY **不删**该卡（非显而易见 scratch）；建议产品/研事后清理废卡，**不挡 PASS**。

### 10. SELFTEST — **PASS（静态-only 旁证）**

`SELFTEST.md` + `selftest/patched.javap-c.txt` / `orig.javap-c.txt`：byCase / byPool QTP57 / byPool LTP901082 / 负例落 ORIG / inspectSource 无刀 / major52 均标 PASS。**无干净机或现网 LIVE 自测**——本 VERIFY 结论为 **静态-only**；A1+A2 验收留给放行·LIVE 后测口。

---

## 实核摘要

| 键 | 宣称 | 实测 |
|---|---|---|
| 准修 sha16 | `04b85f9b81fb907b` | ≡ |
| ORIG Gate | `bb4d9ec345d066be` | ≡ EXTRACT 字节 |
| NEW Gate | `e7d2f3b18c2fe075` | ≡ classes/nested-inject/pkg |
| tgz sha16 | `eb1a4426f542eba9` | ≡ sha256(tgz)[:16] |
| FINAL | `b4eedcf1` | ≡ |
| 短sha / tag / 分支 | `0955febf` / `tip/0955febf-on-b4eedcf1` / tip/demo-bypass-… | tip-git 齐 |
| EXTRACT MANIFEST | `5a764206` | `5a764206676f82f4` ≡ |

**可追溯三项（分支+短sha+叠基 FINAL+tag）：齐。**

---

## 放行态

- **RD-VERIFY = PASS** → 可求 **产品放行** → 运维按 `OPS-MOUNT.md` 挂 nested 单 class。
- 演示收口立刻执行 HANDOFF 恢复法（覆回 ORIG）。
- 禁自 LIVE；挂上≠PASS；案1不动；密钥不进件。

## 盖了 / 没盖

- **盖了**：静态十项；ORIG≡EXTRACT；NEW 旁路谓词；tgz/准修/可追溯；恢复法；覆写清单。
- **没盖**：放行章；LIVE；A1/A2 现网；干净机自测。

## sha16
`89836730ace7161d`
