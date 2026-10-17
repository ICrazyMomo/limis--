# CODE-PUSH-03 bundles

CODE-PUSH-03 的 git bundle 拆成 **两个独立 zip**（各自可单独解压校验）。**禁止**将 `.bundle` 或 zip 放进 git 对象；公开仓只保留本 README 与 `SHA256SUMS.txt`。

## 下载（GitHub Release）

**Release tag**：`handover-20261017-code-push-bundles`  
**页面**：<https://github.com/ICrazyMomo/limis--/releases/tag/handover-20261017-code-push-bundles>

| 附件 | 约 size | sha16 | 直链 |
| --- | --- | --- | --- |
| `code-push-bundles-half1.zip` | 24MB | `813b9593499829a8` | [下载 half1](https://github.com/ICrazyMomo/limis--/releases/download/handover-20261017-code-push-bundles/code-push-bundles-half1.zip) |
| `code-push-bundles-half2.zip` | 12MB | `9f33a4bae13c6f6e` | [下载 half2](https://github.com/ICrazyMomo/limis--/releases/download/handover-20261017-code-push-bundles/code-push-bundles-half2.zip) |

完整 sha256 见本目录 `SHA256SUMS.txt`（含 `part-docs-tips.zip` 等交接附件校验行）。

## 解压与合并使用

两包解压后目录名均为 `part-code-push-bundles/`。请放到**同一父目录**下合并（先解压 half1，再解压 half2 到同一父目录，后解压的文件与 half1 并列，勿覆盖同名非 bundle 文件时可先分别解压到子目录再 `mv` bundle 到一处）。

```bash
mkdir -p ~/code-push-03 && cd ~/code-push-03
# 从 Release 下载两个 zip 后：
unzip -q code-push-bundles-half1.zip
unzip -q -o code-push-bundles-half2.zip   # bundle 文件名互不重复，可同目录
sha256sum -c SHA256SUMS   # 使用 half1 包内 part-code-push-bundles/SHA256SUMS（若已合并目录）
ls part-code-push-bundles/*.bundle
```

`git bundle verify part-code-push-bundles/<name>.bundle` 按需逐包校验。

## half1 内含（`part-code-push-bundles/`）

| 文件 | 说明 |
| --- | --- |
| `CODE-PUSH-03-RESULT.md` | 推送结果与停推说明 |
| `codex-three-lines-dual-adf04e44.bundle` | 双审三线 |
| `codex-three-lines-dual-plus-lingyang-full.bundle` | 双审+领样全量 |

## half2 内含（`part-code-push-bundles/`）

| 文件 | 说明 |
| --- | --- |
| `codex-three-lines-entry-0a6ac4d9-tipgit.bundle` | 入口线 tip-git |
| `codex-three-lines-jia-FE-4fea5d72-tipgit.bundle` | 甲 FE |
| `codex-three-lines-lingyang-b9e2e413.bundle` | 领样三线 |
| `codex-tipgit-dual-adf04e44-extra.bundle` | 附加 tip-git |

合并后共 **6 个 `.bundle`** + `CODE-PUSH-03-RESULT.md` 等说明件。上下文见 `jarvis-handoff/交接-Jarvis-给新GrokBot-接手以来做了什么-20261017.md` §CODE-PUSH-03。
