# OPS-MOUNT · tip readback-merge-oo-forms · 4fea5d72c8fb45e6

**须产品放行章后执行。禁自挂；禁 bak 互倒冒充合并。**

1. 备份：`cp -p LabDataReadBack-BViU_OnG.js LabDataReadBack-BViU_OnG.js.bak-before-merge-4fea5d72c8fb45e6`
2. 覆写：用本包 `dist/assets/LabDataReadBack-BViU_OnG.js` 同名覆盖（目标 sha16=`4fea5d72c8fb45e6`）
3. 可选：同步 `LabDataReadBack-tip.css`
4. **不**覆写 `index-B3030jDs.js`；**不**动 Core；**不** nginx reload（assets 已 no-cache）
5. 硬刷验证；写 OPS-LIVE；挂上≠PASS

叠基 FINAL 观察钉：`7080b882`。
