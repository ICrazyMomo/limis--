# HANDOFF · tip BFF point-submit → Core plural evidence-packages · 20261017

**交 RD-VERIFY → 产品放行 → 运维按 OPS-MOUNT 叠挂。Claude程序员-mod 不自挂。**

## 产品章 / BRIEF
- 准修：`/workspace/artifacts/PRODUCT-STAMP-准修-证据包submit503-路径分叉-勾①BFF改打Core复数口-叠1b932745-20261017.md` · 盘 **43749bb3**
- BRIEF：`BRIEF-研5-准修①BFF点位口改打Core复数口-给Claude-mod-叠1b932745-20261017.md` · sha16=**18afed2827be13d1**
- 摘盘：`OPS-EXTRACT-PointEvidenceController-20261017/` · PRE `fab1cbbed675e551` MATCH · BFF FINAL **0b0a8f2e** · PID 2659759

## 产物（sha 自检 · GATE-研发-出包sha自检与HANDOFF）
| 项 | 路径 / 值 |
|---|---|
| 目录 | `/workspace/artifacts/deliver-tip-bff-evidence-submit-plural-on-0b0a8f2e-20261017/` |
| tgz | `bff-tip-evidence-submit-plural-on-0b0a8f2e-20261017.tgz` · sha256=`07ca168a6fdd7bb0de6f0ba59307ab39c942fb9cf74fa961ad39f1fcf40770c5`（前16=`07ca168a6fdd7bb0`；权威副本 `TGZ.sha256`） |
| 改类 | **仅** `com.lei.mobile.evidence.PointEvidenceController` |
| 改方法/串 | `exchange` submit 分支；INT URI→`/evidence-packages/submit`；新增 `adaptCoreSubmitReceipt`；常量 `CORE_PACKAGE_CONTRACT`/`TIP_MARKER` |
| ORIG (PRE) | `fab1cbbed675e551c33e0ee249981245f40dbf0033216a32c136da6878a5d853`（前16=`fab1cbbed675e551`） |
| PATCHED (NEW) | `b987a3f4c0aea0bee448ba28ae8af7366df160cfe7ea6ad0bd4405a6b2bc659e`（前16=`b987a3f4c0aea0be`） |
| major | **52** |
| 放行章 | **尚无放行章** |
| 叠基 FINAL | **0b0a8f2e**（BFF jar；≠ DIAG 1b932745） |

## 可追溯（Boss 令 · 强制）
| 项 | 值 |
|---|---|
| **分支名** | `tip/bff-evidence-submit-plural-on-0b0a8f2e-20261017` |
| **短 sha** | `dbcd08cb`（全长 `dbcd08cb943ff73a97ec3a9e16fb195302ed1c2f`） |
| **叠基 FINAL** | `0b0a8f2e` |
| **tag** | `tip/b987a3f4-on-0b0a8f2e` |
| 仓库（本箱） | `/workspace/scratch/limis-ready/limis-web` |
| worktree | `/workspace/scratch/claude-mod-bff-submit/git-wt` |
| 源码（仓） | `lei-mobile-bff/src/main/java/com/lei/mobile/evidence/PointEvidenceController.java`（本 tip **新增**；仓内原缺、现网有 class） |
| 源码（交件） | `src/com/lei/mobile/evidence/PointEvidenceController.java` |
| 远端 | **本箱无 remote / 未推送** |
| 旁证 | `GIT-TRACE.txt` |

### 挂前合分支 + tag（运维/合码模板；本箱未推远端）
```bash
git fetch <origin> tip/bff-evidence-submit-plural-on-0b0a8f2e-20261017 || true
git checkout -B tip/bff-evidence-submit-plural-on-0b0a8f2e-20261017 dbcd08cb943ff73a97ec3a9e16fb195302ed1c2f
git tag -a tip/b987a3f4-on-0b0a8f2e -m "BFF tip b987a3f4 evidence-submit-plural on BFF FINAL 0b0a8f2e"
# git push <origin> tip/bff-evidence-submit-plural-on-0b0a8f2e-20261017
# git push <origin> tip/b987a3f4-on-0b0a8f2e
```

## 全量覆写清单
见 `OVERWRITE-LIST.md`（BRIEF §4 模板；**齐**；漏列作废）。

## 负例 N1–N7（本 tip 规避）
| # | 规避 |
|---|---|
| N1 | INT 串已改复数；strings/javap 可证 |
| N2 | 打进 Core 权威 submit，不造软失败无落库 |
| N3 | 点位 PUB 口保留 |
| N4 | 单 class；未进 photos502/案1/Gate/tl189/1606 |
| N5 | 叠基写 **0b0a8f2e** |
| N6 | OVERWRITE 已列唯一挂上 class |
| N7 | 叠准修 43749bb3 + BRIEF 18afed28；未自 LIVE |

## 红线
禁②③；禁 photos502；禁案1；禁自 LIVE；禁自挂；密钥未进件；挂上≠PASS。
