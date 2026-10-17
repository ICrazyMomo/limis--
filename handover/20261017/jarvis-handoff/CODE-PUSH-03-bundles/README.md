# CODE-PUSH-03 bundles

两包真实 zip（各自可独立解压）：

| 文件 | size | sha16 | Release |
|------|------|-------|---------|
| `code-push-bundles-half1.zip` | ~24MB | `813b9593499829a8` | **待下一帖** |
| `code-push-bundles-half2.zip` | ~12MB | `9f33a4bae13c6f6e` | 见下方 |

解压后均含 `part-code-push-bundles/` 下若干 `.bundle`（**禁止**将 `.bundle` 进 git 对象）。

## 落盘与 Release

- git 树内仅本目录 **README + SHA256SUMS**（及上级 `MANIFEST-handover-push-20261017.md`）。
- 二进制 zip 挂 GitHub Release tag **`handover-20261017-code-push-bundles`**。
- **2026-10-17**：half2 已上传；half1 未到齐前 Release 为**部分附件**，合并校验见 `SHA256SUMS.txt`。

下载入口（half2 可用后）：<https://github.com/ICrazyMomo/limis--/releases/tag/handover-20261017-code-push-bundles>

## half2 内含 bundle（解压后）

| 文件 | 说明 |
|------|------|
| `codex-three-lines-entry-0a6ac4d9-tipgit.bundle` | 入口线 tip-git |
| `codex-three-lines-jia-FE-4fea5d72-tipgit.bundle` | 甲 FE |
| `codex-three-lines-lingyang-b9e2e413.bundle` | 领样三线 |
| `codex-tipgit-dual-adf04e44-extra.bundle` | 附加 tip-git |

完整 bundle 列表待 half1 到齐后在本 README 补全。
