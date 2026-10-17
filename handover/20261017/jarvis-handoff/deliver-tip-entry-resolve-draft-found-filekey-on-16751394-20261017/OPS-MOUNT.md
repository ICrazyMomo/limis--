# OPS-MOUNT · tip entry-resolve-draft found+fileKey · PRE 16751394

## 挂前闸
1. 现网 Core FINAL 短号 **必须 ≡ `16751394`**（全 sha 对 EXTRACT）；漂则停挂。
2. nested `lei-system-1.0.0.jar` 内 Receipt ORIG sha16 ≡ `8301b6618420a538`；\$1 ORIG ≡ `f64de1c768d0fd40`。
3. 产品放行章（本 HANDOFF **尚无**）到手前 **禁 LIVE**。
4. 甲 FE 维持 `4fea5d72`；禁 bak；禁动 `/lab/entry`；禁案1；禁写库灌行。

## 挂载
- mode：`core-overlay`（nested class 注入）
- 覆写：`BOOT-INF/lib/lei-system-1.0.0.jar` 内
  - `com/lei/system/service/impl/EntryBatchReceiptService.class` → PATCH `0a6ac4d9da060498`
  - `com/lei/system/service/impl/EntryBatchReceiptService$1.class` → PATCH `4b3700868052b666`
  - `EntryBatchReceiptService$RowWriter.class` 可跳过（≡ORIG）或同挂同文
- outer Controller / nested ServiceImpl / I：**不覆写**
- 交件目录 `nested-inject/com/lei/system/service/impl/*.class`

## 挂后
- AFTER 采 FINAL；javap/`strings` 命中 `sys_lab_entry_readback_` + `findAuthoritativeReadback` 调用链
- 烟测 resolve-draft：有 readback 行 → found+fileKey；无行 → found:false
- 挂上≠PASS；开刷另令

## 叠钉补（RD 20261017·双审后）
现盘 FINAL 已漂 `7847817e`（双审 Mapper LIVE）。挂前硬钉改为 nested Receipt ORIG≡`8301b661`（勿因 FINAL≠16751394 停挂）。见 `RD-NOTE-乙tip-LIVE叠基-FINAL漂7847817e-硬钉ORIG-20261017.md`。
