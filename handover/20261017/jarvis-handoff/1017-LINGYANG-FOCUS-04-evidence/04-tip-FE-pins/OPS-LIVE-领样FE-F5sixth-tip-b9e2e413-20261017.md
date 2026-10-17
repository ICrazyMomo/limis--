# OPS-LIVE · 领样 FE F5sixth tip · **b9e2e413** · tgz `e6c25575` · 2026-10-17 Asia/Shanghai

**状态 = LIVE_OK。挂上≠PASS≠开刷。** 仅 FE 同名覆写 `LabSampleHandoverPanel-B5RJ_HtO.js` **50ea6b9f→9b695797**。**未改** Core jar / Mapper / Entry / B3030 / RT / Panel / BFF；**未重启** Core；**未 reload** nginx；**NO_BAK**；禁复挂 tip `46664856`/`6d70a485`；案1不动；未写库；密钥/预签仅 `/tmp/ops-live-secrets/lingyang-f5sixth-b9e2e413/`。未碰乙 tip Core 面。

执行：limis-运维执行器 · **挂上≠PASS** · 串行于乙测窗 `e5e3362f` 收窗后

---

## 结论一行
`LIVE_OK tip=b9e2e413 tgz=e6c25575 FE=9b695797 ORIG=50ea6b9f CAPTCHA=200 SPA=200 CORE=b4eedcf1 PID=3284790 BFF_PID=3239657 CORE_RESTART=no NGINX_RELOAD=no NO_BAK=yes IDEMPOTENT=no BAN_46664856=honored BAN_6d70=honored`

## 收窗 / 放行 / 依据
| 项 | 值 |
|---|---|
| 乙测窗书面收 | `/workspace/artifacts/PRODUCT-STAMP-裁+收窗-查看录入乙-0a6ac4d9-测3-AprimeFAIL-叠ffb09f70-20261017.md` · sha16=`dcbe2ade`（叠 RESULTS`ffb09f70`） |
| RESULTS（复算） | `/workspace/artifacts/RESULTS-测3-查看录入乙-0a6ac4d9-AprimeBprime-20261017.md` · sha256=`ffb09f70914e439aca5391d2f60bdb4318be0ad2c7ed042ebea3ea04fb019f13` · sha16=`ffb09f70` |
| 放行章 | `/workspace/artifacts/PRODUCT-STAMP-放行挂载-领样F5sixth-tip-b9e2e413-tgze6c25575-叠6a2d734d-20261017.md` · sha16=`2c515151` · 状态可 LIVE ✓ |
| 交件 | `deliver-tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017/` |
| tgz | `tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017.tgz` sha256 `e6c25575931cd38c8187a167d63972f3ddfa1cb94cd43f9950b7377225b668ba` · sha16=`e6c25575` |
| FE ORIG | `50ea6b9fd94fcec190d6e0bd778232645a07c9d78368873f50a3c8903fe822b8`（≡ tip 46664856 NEW / 挂前 LIVE） |
| FE NEW / PATCH | `9b6957978955d5092560df023b16ac4b4a8106939282456fb1095caf25a9e7be` |
| 预检 | staging meta `mode=web` tip_id=`b9e2e413` → **PASS** @ **08:21:25 CST** |

## 时刻（CST / Asia/Shanghai）
| 步 | 时刻 | inv |
|---|---|---|
| preflight PASS | 08:21:25 | — |
| STS→COS Put（tgz+FE） | ~08:21:40 | — · key `tips/lingyang-b9e2e413/` |
| 挂前 RO + ORIG 闸 | **08:23:14** | `inv-aa0pvr059r` SUCCESS · ORIG≡50ea6b9f 盘+HTTP |
| apply 原子覆写 | **08:23:24～08:23:25** | `inv-ba0pvvgp5n` SUCCESS · **NO_BAK** |
| post-verify | **08:23:36～08:23:37** | `inv-8a0pw40t7r` SUCCESS |
| **挂完** | **2026-10-17 08:23:37 CST** | — |

## TAT inv 列表
1. `inv-aa0pvr059r` · ly-f5sixth-prero-b9e2 · SUCCESS
2. `inv-ba0pvvgp5n` · ly-f5sixth-apply-b9e2 · SUCCESS
3. `inv-8a0pw40t7r` · ly-f5sixth-postv-b9e2 · SUCCESS

## 挂前硬门（PRE_RO）
| 闸 | 结果 |
|---|---|
| 现网 Handover ≡ ORIG `50ea6b9f…` | **ORIG_HANDOVER_GATE_OK**（盘+HTTP） |
| 禁复挂 tip `46664856`/`6d70a485` | **BAN_REMOUNT_TIP=46664856,6d70a485** 记；本枪 tip=`b9e2e413` / tgz=`e6c25575`（≠ 382b76f7 / 旧包） |
| B3030 `2bb9558e…` / RT `4c59abb3…` / Panel `04b73f9c…` | OK |
| Core FINAL 观察 | `b4eedcf104953d93…`（乙 tip 后现盘；**不挡**本 FE tip；放行章已写） |
| BFF jar / PE class | `9edca2f7…` / PE=`b987a3f4…`（本枪禁碰） |
| Entry `f42276d3…` / BFF SamplingEntry `680179e9…` | 只读观察 |
| CAPTCHA_PRE | 200 |
| PID | core **3284790** / bff **3239657** |
| NO_BAK | yes（本 FE 流程禁 bak） |

## 挂后核（post-verify）
| 对象 | 挂后 | 结果 |
|---|---|---|
| Handover 盘 | **9b6957978955d509…** root:root 644 65780 | ≡ NEW |
| Handover HTTP（cache-buster + 裸） | **9b695797…** · ETag `"6ad2bffc-100f4"` · LM 00:23:24 GMT | HTTP_HO_NEW_OK · URL `/tlyf/assets/LabSampleHandoverPanel-B5RJ_HtO.js` |
| B3030 / RT / Panel | 与挂前同 | CHUNKS 未漂 |
| Core / BFF jar / 两 PID | 与 PRE_RO 同 `b4eedcf1` / `9edca2f7` / **3284790** / **3239657** | CORE_BFF_UNTOUCHED |
| CAPTCHA | 200 | CAPTCHA_OK |
| SPA index `/tlyf/` | 200 | SPA_INDEX_CODE=200 |
| `node --check` live FE | OK | NODE_CHECK_OK |
| Core restart / nginx reload | **no** / **no** | ✓ |
| bak | **NO_BAK**（未建 `bak-before-lingyang-b9e2e413-*`） | ✓ |
| 二次覆写 | **否**（一次原子挂成） | IDEMPOTENT=no |

## apply 要点
- pull tgz≡`e6c25575…` · FE≡`9b695797…` · tgz 内 dist/assets 仅 1 文件 · BAN_CROSS_TIP_OK · BAN_REMOUNT_46664856_OK · BAN_REMOUNT_6d70_OK · BAN_B3030_OK
- 二次 ORIG 闸 LIVE_HO_PRE≡`50ea6b9f…` → OK → **无 bak** → 同名原子 mv（ORIG 仅 `/tmp` snapshot 应急，不落 assets bak）
- 信息性 markers：PENDING/DOCREADY/RHO_OO/PENDVER OK（**硬闸以字节≡NEW 为准，已过**）

## 回滚（须产品回滚令）
```
A=/data/lanes/SPRINT-MERGE18-PREP-0926/lei-web/dist/assets
# 回滚到 ORIG 50ea6b9f…（= tip 46664856 NEW）；包内 orig/ 或交件目录
# cp -p <ORIG_BYTES> "$A/LabSampleHandoverPanel-B5RJ_HtO.js"
# 禁复挂 tip 46664856/6d70a485 包充回滚；禁热换旧 bak
```

## 禁触 / 禁复挂声明
未动：Core/jar、BFF、B3030、RT、Panel、index、双审、生成方案、案1、乙 tip Core 面。密钥/预签不进 artifacts（仅 SEC）。**禁复挂** `46664856`/`6d70a485`。**禁 bak**（本枪 NO_BAK）。禁写库；禁同窗并其他 tip；不开刷。

**挂上≠PASS。** 开刷另章（测3 领样线 HOLD 至本 AFTER + 另盖开刷章）。

## sha16
dbd592c6f3618616
