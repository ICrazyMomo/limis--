# RD-VERIFY · 请主代理核 · tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413 · 2026-10-17 08:10 Asia/Shanghai

## 交件
- 目录：`/workspace/artifacts/deliver-tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017/`
- tgz：`tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017.tgz` · sha16 见包外 SHA16-TGZ.txt
- 短sha：`b9e2e413` · tag `tip/b9e2e413-on-7080b882` · 章 `6a2d734d` · DIAG `18fd5c5b`

## 请核清单
1. **准修面**：仅 A2+B2；旧 F5′″‴/F5quara/F5⁵ 保留；**C 未主开**；禁扩 chunk；B3030 不覆写
2. **PRE→NEW**：`50ea6b9fd94fcec1` → `9b6957978955d509`；ORIG 包内 ≡ 现网 LIVE（46664856）
3. **刀面 A2**：`_f5ResumeLockRecordId`；reset bump gen 锁仍效；清 record 后黄文「相位被打断」
4. **刀面 B2**：空窗盖 lock 残存；te 后清重入；`immediate:!0`；task watcher reset 后重入
5. **清单**：全量覆写 = 1 文件；共享入口 B3030/NJVZXfJd/requestId/jszip **逐一否**
6. **SELFTEST**：26 PASS（13+6+7；静态 ≠ 公网）
7. **红线**：未自 LIVE；未改 Core/写库；未碰案1/密钥；**禁复挂 46664856/6d70a485**；与 tl189/503 分刀；**尚无放行章**
8. **挂前实测认**：FE `50ea6b9fd94fcec1` · Core FINAL `7080b882`

核完 → 产品另盖**放行**后方可运维 LIVE；开刷须贴硬门槛 E（Vue phase/record/error/te + Network）。
