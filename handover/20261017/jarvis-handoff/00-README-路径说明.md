# limis-handover 路径说明 · 2026-10-16

> Boss Mac：`/Users/qutto/Desktop/limis-handover/`  
> 盒侧源：`/workspace/` · 停工冻结快照见 `limis-team-restore-20261012.md`

## 怎么用（先读）

1. **先看** `limis-team-restore-20261012.md`（门禁 + **停工冻结快照** + 12 项状态）。
2. **全量聊天**用 `limis-memory-full-20261016.zip` 或同目录解压出的 md（**不要**再用已作废的 30KB「记忆包」）。
3. **整仓工件**用 `limis-workspace-full-20261016.zip`（须先按下面命令合并分片）。
4. **只要 artifacts**可用 `limis-artifacts-20261016.zip`（workspace-full 已含 artifacts，专包便于单取）。

### 合并分片（Mac 终端）

```bash
cd ~/Desktop/limis-handover

# workspace 全量（约 2.1GB）
cat limis-workspace-full-20261016.part-* > limis-workspace-full-20261016.zip
# 校验（可选）
ls -lh limis-workspace-full-20261016.zip
unzip -t limis-workspace-full-20261016.zip | tail

# artifacts 专包（约 655MB）
cat limis-artifacts-20261016.part-* > limis-artifacts-20261016.zip
```

分片均为 **90MiB**（末片可更小）。`CopyFromBox` 单文件上限 100MiB，故分片。

### 记忆包分片合并（若整包 CopyFromBox 不稳）

```bash
cd ~/Desktop/limis-handover
cat limis-memory-full-20261016.part-* > limis-memory-full-20261016.zip
cat 团队与Jarvis全量聊天记忆-至20261016.md.part-* > 团队与Jarvis全量聊天记忆-至20261016.md
```

记忆分片为 **2MiB**（通道不稳时用）；workspace/artifacts 仍为 **90MiB**。


---

## 逐文件用途

| 文件 / 目录 | 用途 |
|---|---|
| `00-README-路径说明.md` | 本说明：合并命令 + 逐文件用途 |
| `limis-team-restore-20261012.md` | **主交接文档**：常驻门禁⑧–⑰、红线、真数据台账、审计链评估指针、**停工冻结快照（12项/ρ/W4/报告/已停名单）** |
| `交接包附录-历史统计与交割方式-20261016.md` | 历史条数口径、交割方式、全量记忆指针 |
| `团队与Jarvis全量聊天记忆-至20261016.md` | **全量聊天正文**（不截断）：Jarvis+团队 search-index 38017 条 + 4 通语音全文 |
| `limis-memory-full-20261016.zip` | 上项 + `memory-full-20261016/` 分成员 md + voice-json 的压缩包 |
| `memory-full-20261016/` | 按成员分文件 + `00-INDEX.md` + `00-Jarvis-voice-calls.md` + `voice-json/` |
| `limis-workspace-full-20261016.zip` | `/workspace` **全量**（含隐藏文件/日志/artifacts/limis 代码树等）；由 `.part-*` 合并 |
| `limis-workspace-full-20261016.part-00`… | workspace-full 的 90MiB 分片 |
| `limis-artifacts-20261016.zip` | artifacts 专包（tip/VERIFY/STAMP/RESULTS 等）；由 `.part-*` 合并 |
| `limis-artifacts-20261016.part-00`… | artifacts 专包分片 |
| `代码理解-limis-研发组-20261016.md` | 研发组代码理解全文稿 |
| `代码理解-*-part*.md` | 研2/3/4 等分篇（若在目录中） |
| `欠账清单-limis.md` / `BACKLOG-*` | 欠账（非今晚核对门槛） |
| `演示交接包-2026-10-16.tar.gz` | 较早演示交接打包（若在目录中） |
| `记忆包-limis-交接-20261015-20261016.md` | **作废**（约30KB 摘要）；勿当全量 |
| `团队聊天记忆-20261015-20261016.md` | **作废**（旧截断版）；以全量 md/zip 为准 |

---

## 全量记忆覆盖 / 找不到（摘要）

- **有**：2026-10-16 08:22:38 CST 起 search-index **38017** 条全文；Jarvis 语音 **4** 通已落盘 **500** turns；含研5/云端出包/程序员 bot。
- **无**：2026-10-15 及更早聊天；成员间直连对端字段；call-**963112bb**（进行中未落盘）；迁号前旧号 transcript。
- 详情见全量记忆文件文首「覆盖范围声明 / 找不到清单」。

## 关系

- `workspace-full` ⊃ `artifacts/`（故也 ⊃ 多数章与记忆 md）；`artifacts` 专包 = 便于只拷工件。
- 记忆 zip 与全量 md **单独拷贝**，即使不合并 workspace 也能先读聊天。

## 红线

案1 QC-900421 不动；不写密钥；对外先问 Boss；挂上≠PASS；全停期间禁 tip/开测/写库。
