# SELFTEST · BFF evidence-submit-plural · 20261017

## 字节
- major version = **52**（`javap -verbose` → `build/javap-verbose.txt`）
- PRE sha16=`fab1cbbed675e551` ≡ EXTRACT 钉 `fab1cbbe`；与 NEW **不等**
- PATCHED sha16=`b987a3f4c0aea0be`
- JDK8：`javac -source 1.8 -target 1.8`；`source /etc/profile.d/java-maven.sh`；禁云端

## strings / 常量池（INT 目标为复数口）
| 串 | 期望 |
|---|---|
| `/evidence-packages/submit` | **有**（submit INT） |
| `evidence-package-v1` | **有**（Core INT 合同） |
| `TIP_BFF_EVIDENCE_SUBMIT_PLURAL_ON_0b0a8f2e_20261017` | **有** |
| `POINT_SUBMITTED` | **有**（PUB 回执） |
| `@/api/mobile/v1/task-lists/{task}/points/{point}/evidence-package` | **有**（PUB 未拆） |
| `/points/` + `/evidence-package/` | **有**（仅 context/submissions GET） |

箱内已跑：`strings` + `javap -c` 见 `build/`；submit 分支 ldc `/evidence-packages/submit`，非 submit 仍 ldc `/points/`+`/evidence-package/`。

## 负例声明（N1–N7）
见 `DIFF.md` 表；本 tip 在 HANDOFF 同步声明。

## 未做
- 未挂 LIVE；未真机探针；未改 Core/端/photos502；尚无放行章
