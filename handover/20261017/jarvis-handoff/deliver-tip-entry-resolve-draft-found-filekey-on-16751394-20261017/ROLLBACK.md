# ROLLBACK · entry-resolve-draft found+fileKey

1. 将 nested Receipt.class / \$1.class 还原为 ORIG：
   - Receipt `8301b6618420a538`
   - \$1 `f64de1c768d0fd40`
2. RowWriter 本就 ≡ ORIG，无需动。
3. 重启 Core；核对 FINAL；禁与甲 FE 互倒。
