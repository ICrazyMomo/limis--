# DIFF · tip 查看录入真合并 OO↔forms · 甲+丙 · 乙二期 · 2026-10-17

- **写件**：2026-10-17 ≈07:15 Asia/Shanghai（CST）
- **准修主章**：`7494673f`（Boss 选②）· **补钉**：`5bde3ea6`（甲必 / 乙可二期）
- **DIAG**：`89c49114` · 定案：`e5321114` · OPS-RO：`c1600996`
- **基线 ORIG（现网）**：`LabDataReadBack-BViU_OnG.js` sha16=`b4ca9359`（纯 forms 开屏闸）
- **参考 ORIG OO**：`9949b636`（只读逻辑参考；**禁** bak 热换当交付）
- **PATCH**：sha16=`4fea5d72c8fb45e6`
- **叠基 FINAL 观察钉**：`7080b882`（本 tip **不改 Core**）

## 刀面（甲）

| 步 | 行为 |
|---|---|
| 1 | 取 forms 快照（`GET forms/{id}` / by-task） |
| 2 | 软探 `POST /system/entry/batch/resolve-draft`：仅 **found===true + fileKey** → 只读开 OO（`GET …/config/{fileKey}?mode=view`） |
| 3 | **非明确 found**（抛错/非200/found≠true/无 key）→ **一律 forms**（乙未齐保守） |
| 4 | 有簿但 OO 配置失败等不可归类 → 业务可读句；**不**偷降 forms、**不**硬开空 OO |
| 禁 | **不**调 `/document` 生成；**无**「重新生成」钮；不覆写 `index-B3030jDs`；不动 `/lab/entry` |

## vs 三态

| 变体 | sha16 | 本 tip |
|---|---|---|
| ORIG OO | 9949b636 | 参考软探+OO 只读；**去掉**默认生成与「重新生成」 |
| A2 forms | 55343dd9 | 保留 forms 快照 UI |
| 现网开屏闸 | b4ca9359 | **ORIG 基线**；在其上加软探分支 |
| **本 PATCH** | 4fea5d72c8fb45e6 | 真合并双极 |

## 乙 · Core 软探 API

**本 tip 不含（二期）**。现网 `resolve-draft` 缺 `entry_batch_source` 仍 ERROR；FE 按补钉保守把非明确 found 当 forms。有簿正例 A/N2 须权威 found 源——无乙则开刷另验/BLOCKED，禁假 PASS。

## 未改

- Core / jar / FINAL `7080b882`
- `index-B3030jDs.js` / 父页 index
- `/lab/entry` · 案1 · 密钥 · `BatchEntryDialog` · 迁表
