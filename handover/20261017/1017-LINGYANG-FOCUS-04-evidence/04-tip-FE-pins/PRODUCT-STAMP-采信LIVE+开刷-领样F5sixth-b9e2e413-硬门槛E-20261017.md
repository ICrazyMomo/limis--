# 产品：采信领样 F5⁶ LIVE/AFTER + 开刷（硬门槛 E）
状态：已生效
时刻：2026-10-17 08:26 Asia/Shanghai
LIVE：`OPS-LIVE-领样FE-F5sixth-tip-b9e2e413-20261017.md` sha16=`dbd592c6f3618616`
AFTER：`OPS-AFTER-领样FE-F5sixth-tip-b9e2e413-LIVE后-20261017.md` sha16=`51aec897c2941e8a`
叠：放行 `2c515151` · 准修 `6a2d734d` · 收窗 `dcbe2ade` · VERIFY `26c05878`

## 采信 LIVE / AFTER
| 项 | 值 |
|---|---|
| tip / tgz / FE | **`b9e2e413`** / **`e6c25575`** / **`9b695797`←`50ea6b9f`** |
| 范围 | 仅 Handover FE；Core=`b4eedcf1` PID=`3284790` **未重启**；BFF PID=`3239657` **未动**；NO_BAK |
| 串行 | 乙收窗`dcbe2ade`后挂；**禁复挂 `46664856`/`6d70a485`** 已守 |
| VERDICT | **LIVE_OK** + **AFTER_OK** · 挂上≠PASS |

## 开刷（写全 · 缺一项作废）
| 项 | 钉 |
|---|---|
| 谁 | **测3**（测口派；禁抽测2） |
| 账号 | **admin** |
| 夹具 | **甲73**（维持；wd/`LTP` 以现网甲73 池为准；禁案1；禁盲换） |
| 页 | 领样/流转卡继续链（Handover） |
| 包号 | 只认 tip **`b9e2e413`** / FE **`9b695797`** / tgz **`e6c25575`**（RESULTS 写错包号作废） |
| 截止 | **2026-10-17 12:00 Asia/Shanghai** |
| 屏成功态 | 继续后：进步③「查看本次实际流转卡」**或**同帧 FAIL/黄文/`te`（**禁**空停步①） |
| 钮 | 主钮可点路径按真机；灰钮旁注可读 |
| 库态真值 | 本枪 FE 兜底（A2 锁绑 recordId + B2 空窗 reset）；不要求写库改态 |
| **硬门槛 E（必贴）** | RESULTS **必贴**：点后 Vue `phase` / `record.id` / `state` / `error` / `te` + 当次 Network **verification** × **view-sessions** 成对；未贴→裁「未证运行时」 |
| 负例 | 禁只交接口200；禁「继续确认」当过关；**禁与乙 DIAG/新 tip 同窗**；禁复挂旧 tip 冒烟 |
| 恢复条 | **默认放弃** |

## 验收句
1. 甲73 继续→verification 后：**有卡可看** 或 **同帧可读旁注**（二缺一 FAIL）——验 A2+B2
2. 硬门槛 E 证据齐
3. 真点截图才算；挂上≠PASS；HTTP200≠PASS

## 令
| 谁 | 令 |
|---|---|
| **测口/测3** | **立刻开刷**；RESULTS 交产品裁 |
| **运维** | 禁再挂本 tip；禁复挂旧 tip；乙 tip 另线 |
| **研发** | 禁自再挂；乙准修 tip 另线勿混本窗 |

## 盖了 / 没盖
- **盖了**：采信 LIVE`dbd592c6`+AFTER`51aec897`；本 F5⁶ **开刷**（硬门槛 E）
- **没盖**：公网 PASS；C 主钉；乙混窗；模块 PASS

红线：案1不动；无本开刷章禁开跑；挂上≠PASS；与乙/双审另线。
