# RD-VERIFY · 请主代理核 · tip-lingyang-fe-f5fifth-57945808-46664856 · 2026-10-17 07:34 Asia/Shanghai

## 交件
- 目录：`/workspace/artifacts/deliver-tip-lingyang-fe-f5fifth-57945808-46664856-20261017/`
- tgz：`tip-lingyang-fe-f5fifth-57945808-46664856-20261017.tgz` · sha16 见包外 SHA16-TGZ.txt
- 短sha：`46664856` · tag `tip/46664856-on-7080b882` · 章 `57945808` · DIAG `91c65ccb`

## 请核清单
1. **准修面**：仅 A+B；旧 F5′″‴/F5quara 保留；C 不主开；禁扩 chunk；B3030 不覆写
2. **PRE→NEW**：`3b7a8a6a` → `50ea6b9f`；ORIG 包内 ≡ 现网 LIVE（6d70a485）
3. **刀面 A**：`_f5ResumeLockGen` + `__f5PhaseLockOnSelect`；打回 SELECT → 强制 CARD +「相位被打断」
4. **刀面 B**：`__f5EmptyWindowGate`；PENDING*+SELECT/步① → te+error；ur 尾 + xe watch
5. **清单**：全量覆写 = 1 文件；共享入口 B3030/NJVZXfJd/requestId/jszip **逐一否**
6. **SELFTEST**：19 PASS（13+6；静态 ≠ 公网）
7. **红线**：未自 LIVE；未改 Core/写库；未碰案1/密钥；**禁复挂 6d70a485**；与 tl189/503 分刀
8. **挂前实测认**：FE `3b7a8a6a` · Core FINAL `7080b882`

核完 → 产品另盖**放行**后方可运维 LIVE；开刷须贴硬门槛 E（Vue phase/record/error/te + Network）。
