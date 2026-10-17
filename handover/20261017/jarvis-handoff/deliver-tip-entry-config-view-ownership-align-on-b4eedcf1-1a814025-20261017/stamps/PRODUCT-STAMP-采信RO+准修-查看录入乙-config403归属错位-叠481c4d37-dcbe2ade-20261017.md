# 产品采信 RO + 准修：查看录入乙 · config403 归属错位
状态：已生效（**准修**；≠ tip ≠ LIVE ≠ PASS）
时刻：2026-10-17 08:25 Asia/Shanghai
RO：`OPS-RO-查看录入乙-config403-sys_temp_file-901074vs901081-叠ffb09f70-20261017.md` sha16=`481c4d3705744c61`（rfind 算法 ≡ sidecar）
叠：裁`dcbe2ade` · RESULTS`ffb09f70914e439a` · tip`0a6ac4d9` · 准修旧`e2386021` · 甲 FE`4fea5d72`

## 结论先行
| 项 | 裁 |
|---|---|
| RO | **采信**（DIAG 齐：请求文案×Service 硬闸×库 create_user） |
| 根因 | resolve-draft **不要求** create_user==actor；`config` **要求** → 契约错位；901074×8 属 900314，admin 必 403 |
| **准修** | **准**——**仅 view/只读回读路径** 与权威软探对齐：有簿（同 findAuthoritativeReadback 命中）须能开 OO；**禁**再要求 create_user==查看者 |
| edit | **本票不动**（liveEdit/编辑归属另列） |
| 甲 FE | **不动**；禁 bak；禁盲 tip |

## 刀面（准）
1. `EntryBatchServiceImpl.config`：当 `mode=view`（查看录入只读）时，归属闸与 `findAuthoritativeReadback` 同口径——簿存在（file_type/del_flag/business/foreign_key 命中）即可拼 OO；**不得**仅因 create_user≠当前用户 403。
2. `mode=edit`：维持现归属（本票不改）。
3. 文案可区分「不存在」vs「无查看权限」（若改须可读）；禁默认再生簿。
4. tip 前盘测点名 class；RD-VERIFY 须复现：admin 对 create_user=900314 的 901074/#73 → config **200** + OO；901081 回归不回退。

## 验收句（开刷另章微调）
| # | 句 |
|---|---|
| A″ | 权威 found+fileKey 且簿属他账 → admin（或有查看权账号）**OO 只读进屏**；禁权限壳冒充无簿 |
| B′ | found=false → forms+旁注（夹具另列；本票不挡 tip） |
| N1/N2 | 同开刷`e5e3362f`；有簿禁只出壳 |

## 令
| 谁 | 令 |
|---|---|
| **研发** | 可出 **乙 Core tip**（叠本准修）；交 RD-VERIFY；**禁**动甲 FE；禁自 LIVE |
| **运维** | 等放行另章再挂；禁复挂`0a6ac4d9`；领样 LIVE 另线勿混 |
| **测3** | tip LIVE+开刷前继续 HOLD（乙） |
| **产品** | VERIFY PASS→放行→LIVE AFTER 采信→**另盖开刷** |

## 盖了 / 没盖
- **盖了**：采信 RO`481c4d37`；准修 view 归属对齐软探；甲 FE 不动
- **没盖**：tip；放行；LIVE；开刷；模块 PASS；改 edit 闸；动甲 FE

红线：案1不动；查清楚再修；挂上≠PASS；禁盲 tip。
