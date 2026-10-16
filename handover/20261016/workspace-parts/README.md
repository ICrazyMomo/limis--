# limis workspace 全量交接包（2026-10-16）

这是 limis workspace 的全量交接大包，约 2.1GB，已拆成 23 片，供另一个账号下载后在本地合并还原。二进制分片在 GitHub Release 附件中，不在 git 历史里。本目录只放用途说明、整包校验和分片校验。

同级目录里已有的记忆包（`limis-memory-full-20261016.zip` 与聊天记忆 Markdown）与本包无关，请保持原样。

## 整包

| 项 | 值 |
| --- | --- |
| 文件名 | `limis-workspace-full-20261016.zip` |
| 大小 | 2165014924 字节 |
| sha256 | `8235068b325ad27a23e1b6980de4d04da778cbc0c955f7327a3a0fee3072f236` |
| 片数 | 23 |
| 分片名 | `limis-workspace-full-20261016.zip.part-000` … `part-022` |
| 单片大小 | 前 22 片各 94371840 字节（90MB），最后一片 `part-022` 为 88834444 字节 |
| Release tag | `handover-20261016-workspace` |
| Release 标题 | limis workspace full 20261016 |

下载入口：<https://github.com/ICrazyMomo/limis--/releases/tag/handover-20261016-workspace>

分片清单见 `MANIFEST.txt`，各片 sha256 见 `SHA256SUMS.txt`。

## 合并

把 23 个 `part-*` 下载到同一目录后执行：

```bash
cat limis-workspace-full-20261016.zip.part-* > limis-workspace-full-20261016.zip
sha256sum limis-workspace-full-20261016.zip
```

`sha256sum` 结果应等于：

```text
8235068b325ad27a23e1b6980de4d04da778cbc0c955f7327a3a0fee3072f236
```

`part-*` 按文件名排序后 `cat` 即可，前缀为零填充的三位序号，shell 通配符顺序与分片顺序一致。
