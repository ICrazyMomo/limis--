# SELFTEST · tip-lingyang-fe-f5sixth-6a2d734d-b9e2e413-20261017
> 叠章 `6a2d734d` · DIAG `18fd5c5b` · 分支 `tip/lingyang-fe-f5sixth-on-7080b882-20261017` · 短sha `b9e2e413` · FINAL `7080b882` · tag `tip/b9e2e413-on-7080b882`

盒内 node mock（`selftest/selftest-f5sixth.mjs`，子进程跑前枪 F5⁵→F5quara）。**禁 LIVE；SELFTEST_STATIC_OK ≠ 公网 PASS。**

| # | 自测句 | 结果 |
|---|---|---|
| F5′″‴/F2/回归/F5quara | 前枪 13 例全保留 | PASS |
| F5⁵ A/B/reset/回归 | 前枪 6 例全保留 | PASS |
| **F5⁶ A2** | resume 锁 recordId → reset bump gen（锁仍效）→ SELECT → 强制 CARD+黄文 | PASS |
| **F5⁶ A2b** | reset 清 record 后仍持锁 → SELECT 必黄文「相位被打断」 | PASS |
| **F5⁶ B2** | reset 后 PENDING*+SELECT → 禁静默，必 te/强制 CARD | PASS |
| **F5⁶ B2 te** | 写入 te 后无关清 te → 立即重入门再写 | PASS |
| **F5⁶ B2 immediate** | 挂载/首帧必检 | PASS |
| 静态+ORIG | pretty stamp/recordId/reenter；dist 黄文+immediate；ORIG≡`50ea6b9f` | PASS |

原始输出：`selftest/SELFTEST.raw.txt`（`SELFTEST_F5QUAD_OK 13` + `SELFTEST_F5FIFTH_OK 6` + `SELFTEST_F5SIXTH_OK 7` = **26**）。
