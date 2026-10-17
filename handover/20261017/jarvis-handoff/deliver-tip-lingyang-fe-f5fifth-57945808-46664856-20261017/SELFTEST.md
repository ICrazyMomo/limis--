# SELFTEST · tip-lingyang-fe-f5fifth-57945808-46664856-20261017
> 叠章 `57945808` · DIAG `91c65ccb` · 分支 `tip/lingyang-fe-f5fifth-on-7080b882-20261017` · 短sha `46664856` · FINAL `7080b882` · tag `tip/46664856-on-7080b882`

盒内 node mock（`selftest/selftest-f5fifth.mjs`，内嵌跑前枪 F5quara 13 例）。**禁 LIVE；SELFTEST_STATIC_OK ≠ 公网 PASS。**

| # | 自测句 | 结果 |
|---|---|---|
| F5′″‴/F2/回归/F5quara | 前枪 13 例全保留 | PASS |
| **F5⁵ A1** | resume CARD+lock → 打回 SELECT → 强制 CARD + te/error | PASS |
| **F5⁵ B1** | PENDING+SELECT 无 lock → gate 必写 te+error | PASS |
| **F5⁵ B2** | PENDING+CARD → gate 不强制改文 | PASS |
| **F5⁵ reset** | generation bump → 锁失效；B 仍可旁注 | PASS |
| 回归 | F5quara SELECT 空窗；F5‴ 强制 CARD 不破 | PASS |

原始输出：`selftest/SELFTEST.raw.txt`（`SELFTEST_F5QUAD_OK 13` + `SELFTEST_F5FIFTH_OK 6`）。
