# limis artifacts 交接包（2026-10-16）

这是 limis artifacts 交接包，约 655MB（685910425 字节），已拆成 8 片，供另一个账号下载后在本地合并还原。二进制分片在 GitHub Release 附件中，不在 git 历史里。本目录只放用途说明、整包校验和分片校验。

同级目录里已有的记忆包（`limis-memory-full-20261016.zip` 与聊天记忆 Markdown）以及 `workspace-parts/` 与本包无关，请保持原样。

## 整包

| 项 | 值 |
| --- | --- |
| 文件名 | `limis-artifacts-20261016.zip` |
| 大小 | 685910425 字节 |
| sha256 | `ded5c56a08f6efadbff817cb49a9ac006f525a9ecad026a412ba95fd9eacbdd1` |
| 片数 | 8 |
| 分片名 | `limis-artifacts-20261016.zip.part-000` … `part-007` |
| 单片大小 | 前 7 片各 94371840 字节（90MB），最后一片 `part-007` 为 25307545 字节 |
| Release tag | `handover-20261016-artifacts` |
| Release 标题 | limis artifacts 20261016 |

下载入口：<https://github.com/ICrazyMomo/limis--/releases/tag/handover-20261016-artifacts>

分片清单见 `MANIFEST.txt`，各片 sha256 见 `SHA256SUMS.txt`。

## 合并

把 8 个 `part-*` 下载到同一目录后执行：

```bash
cat limis-artifacts-20261016.zip.part-* > limis-artifacts-20261016.zip
sha256sum limis-artifacts-20261016.zip
```

`sha256sum` 结果应等于：

```text
ded5c56a08f6efadbff817cb49a9ac006f525a9ecad026a412ba95fd9eacbdd1
```

`part-*` 按文件名排序后 `cat` 即可，前缀为零填充的三位序号，shell 通配符顺序与分片顺序一致。
