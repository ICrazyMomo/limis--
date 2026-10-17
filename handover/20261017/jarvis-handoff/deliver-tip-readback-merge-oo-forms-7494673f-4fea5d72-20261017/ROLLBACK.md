# ROLLBACK · tip readback-merge-oo-forms · 4fea5d72c8fb45e6

## FE 回滚（放行挂载后若需）

1. 将现网 `LabDataReadBack-BViU_OnG.js` **恢复为挂前备份**（挂载时应 `cp -p` 出 `*.bak-before-merge-4fea5d72c8fb45e6`）
2. 目标指纹：回到 ORIG **`b4ca9359`**（本 tip 基线=现网开屏闸 forms）
3. **不要**用 bak-before-a2-readback（`9949b636`）冒充本 tip 回滚——那是 OO 单极，**禁 bak 热换当合并/交付**
4. 可选同步恢复 `LabDataReadBack-tip.css`
5. 硬刷浏览器；nginx 一般免 reload
6. **不回滚** Core `7080b882`

## 本包自带 ORIG

`orig/LabDataReadBack-BViU_OnG.js` ≡ `b4ca9359`，可作回滚字节源（等产品/运维令）。
