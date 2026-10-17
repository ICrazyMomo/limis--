# Jarvis / limis 换账号迁移包（2026-10-15）

## 怎么用
1. 新账号导入各 bot 模板（Jarvis + 产品/运维/研发/测试等）。
2. 把本目录整包拷进新号工作区 `/workspace/artifacts/` 与 `/workspace/tools/ops-mount/`。
3. 挂 tip 前强制跑 `ops-mount/ops-mount-preflight.sh`。
4. 腾讯云密钥不迁移：新号重注运维私库 client；临时票过期找 Boss 续权。

## 必带块
- OPS-GATE 挂包五条 + tip 墙钟
- ops-mount 整目录
- 云端出包 PLAN/GATE/CHECKLIST + 产品大 jar 基线
- 云端直达公网：STS+COS+TAT 传包 + 机内写库（不开公网库口、不经 Mac）
- 案1不动、密钥不进频道

## 不要带
密钥、私钥、口令文件、保险柜里的秘密值。
