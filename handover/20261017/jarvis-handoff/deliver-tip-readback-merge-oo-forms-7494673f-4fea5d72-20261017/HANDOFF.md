# HANDOFF · tip 查看录入真合并 OO↔forms · 甲+丙 · 乙二期 · 2026-10-17

**交 limis-研发 RD-VERIFY → 产品放行 → 运维 LIVE。禁自 LIVE；禁 bak 热换当交付。**

## ① 产物

| 项 | 值 |
|---|---|
| 目录 | `/workspace/artifacts/deliver-tip-readback-merge-oo-forms-7494673f-4fea5d72-20261017/` |
| 主 FE | `dist/assets/LabDataReadBack-BViU_OnG.js` |
| PATCH sha16 | **`4fea5d72c8fb45e6`**（全长见 `dist/assets/LabDataReadBack-BViU_OnG.js.sha256`） |
| tgz | `fe-tip-readback-merge-oo-forms-7494673f-4fea5d72-20261017.tgz` |
| tgz sha16 | **见包外 `TGZ.sha256` / `SHA16-TGZ.txt`**（打包装后钉死；与包内 HANDOFF 差一拍时以包外为准） |
| ORIG（现网基线）sha16 | **`b4ca9359`** |
| 叠基 FINAL 观察钉 | **`7080b882`**（不改 Core） |
| 含乙 Core？ | **否 · 乙二期** |

## ①bis 可追溯（tip-git）

| 项 | 值 |
|---|---|
| 分支 | `tip/readback-merge-oo-forms-on-7080b882-20261017` |
| tip 短sha | **`5cb6c691`** |
| tip 全sha | `5cb6c691d433d8908f97595af6398641bc284305` |
| tag | **`tip/5cb6c691-on-7080b882`** |
| tip-git | `tip-git/`（本地 orphan；未推远程） |
| 叠基 FINAL | **`7080b882`** |

## ② 准修

| 章 | sha16 |
|---|---|
| 准修主章（Boss 选②） | `7494673f` |
| 补钉（甲必/乙可二期） | `5bde3ea6` |
| DIAG / 定案 / OPS-RO | `89c49114` / `e5321114` / `c1600996` |

## ③ 刀面摘要

1. forms 快照 → 软探 resolve-draft → **明确 found+fileKey** 则 OO 只读；否则 **forms**
2. **禁**默认重新生成；**无**「重新生成」钮
3. 不可归类（有簿但 OO 配置失败等）→ 业务可读句
4. **乙二期**：Core 软存在性 API 未进本 tip；无簿判定靠 FE 保守；有簿夹具 A/N2 开刷须另验/标 BLOCKED（无权威 found 时禁假 PASS）

## ④ 挂载

见 OPS-MOUNT / 全量覆写清单：只覆写 `LabDataReadBack-BViU_OnG.js`（+可选 tip.css）；**不覆写 B3030**；nginx 一般免 reload（assets no-cache）。**须放行后运维挂**；挂上≠PASS。

## ⑤ 红线

禁 bak；禁自 LIVE；禁案1；禁密钥；禁动 `/lab/entry`；禁整包回滚 jar；挂上≠PASS。
