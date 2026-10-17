# DIFF · entry-config view ownership align · 准修 `1a814025`

## ① config（主刀 · ASM）
在 `Objects.equals(createUser, operatorUserId)` 的 **IFNE 失败落点**（create_user≠actor）与共享 403 throw Label 之间插入：

```
ldc "edit"
aload_2          // mode
invokevirtual String.equals
ifeq CONTINUE    // view → 继续拼 OO；edit 落入原 403
```

语义等价：

```java
if (tempFile == null || operatorUserId == null || operatorUserId <= 0L
        || ("edit".equals(mode) && !Objects.equals(tempFile.getCreateUser(), operatorUserId))) {
    throw new ServiceException("批量录入工作簿不存在或不属于当前账号", 403);
}
```

- `tempFile==null` / `userId` 非法：`ifnull`/`ifle` **仍直跳 throw**（不经 view 旁路）→ 禁空簿 NPE
- `mode=view` + 有簿 + 他账 create_user：放行 → 后续 batchFile/readback 闸仍有效
- `mode=edit`：归属闸不变

## ② 未改
- Controller / IEntryBatchService / EntryBatchReceiptService（含 findAuthoritativeReadback）
- forceSave 实验员归属文案路径
- 甲 FE `4fea5d72`；liveEdit；生成归属

## 编法
ASM9 tree 叠 ORIG `5b05565b`（EXTRACT FINAL`b4eedcf1` ≡）；`ClassWriter.COMPUTE_FRAMES|COMPUTE_MAXS`；inners KEEP；major **52**。
工具源：`asm-src/PatchConfigViewOwnership.java`。
