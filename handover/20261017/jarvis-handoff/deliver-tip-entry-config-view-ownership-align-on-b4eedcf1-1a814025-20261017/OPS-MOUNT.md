# OPS-MOUNT · tip entry-config view ownership align · PRE `b4eedcf1`

## 挂前闸
1. 现网 Core FINAL 短号 **必须 ≡ `b4eedcf1`**（全 sha 对 EXTRACT）；漂则停挂。
2. nested `lei-system-1.0.0.jar` 内 Impl ORIG sha16 ≡ `5b05565b4f7e0250`；inners ≡ KEEP 表。
3. 须产品放行章；本 HANDOFF **尚无放行章** → **禁挂**。
4. 禁复挂 tip `0a6ac4d9`（Receipt 已挂）；本票只叠 Impl。
5. 禁与领样开刷同窗抢 Core 重启（产品另裁）。

## 挂载面
- 仅 nested：`BOOT-INF/lib/lei-system-1.0.0.jar` 内 `com/lei/system/service/impl/EntryBatchServiceImpl.class`
- 交件：`nested-inject/com/lei/system/service/impl/EntryBatchServiceImpl.class`（NEW `d05982909028486a`）
- inners 可选随带 KEEP（字节≡ORIG；未改可不写 jar）

## 挂后 AFTER 须写
| 项 | 期望 |
|---|---|
| FINAL | 新短号（≠`b4eedcf1`） |
| Impl | `d05982909028486a` |
| $1/$2/$Resolved/$TaskContext | KEEP ≡ ORIG |
| Receipt | KEEP `0a6ac4d9`（及 $1） |
| Controller / I | KEEP |
| CAPTCHA | 200 |
| 甲 FE | 不动 |

## 回滚
回写 ORIG Impl `5b05565b4f7e0250`；重启 Core；核对 FINAL。

## 红线
禁自 LIVE；挂上≠PASS；案1不动；密钥不进包。
