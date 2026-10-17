# OPS-LIVE · STS→COS→TAT 真传首跑 · 2026-10-15

- 执行方：limis-运维执行手（**Mac 控台主账号建桶** + 盒私库 STS/COS/TAT）
- 时区：Asia/Shanghai（CST / UTC+8）
- **结论（2026-10-15 23:01 CST）：桶已建 · Put 绿 · TAT 拉包 sha 对账 MATCH** → 首跑通；未热换 Core；未碰 KB 备份桶；未碰案1/#893
- 密钥/SecretKey/Token：**未**进本文件、**未**进频道；临时票用后已清
- Mac machineId：`72464d0c-15dd-499a-9c93-620d8e3cae26`（QuttodeMacBook-Air）主账号控台登录态建桶

## 0. 本票目标 vs 实做

| 步 | 目标 | 结果 |
|---|---|---|
| 1 | AssumeRole 传包票 | **绿**（多次；末次 Put 探针 `94d50614-4ed6-42dc-8538-46945d5e3aad`；TAT 拉包 `a7942499-0532-41f2-a02d-9478b45296a3`） |
| 2 | 新建专用传包桶（ap-chengdu，ACL 私有） | **绿** · Mac Chrome 控台主账号新建（API CreateBucket 仍 403，未再空转） |
| 3 | 桶名写入私库 `xfer-bucket.txt` | **绿** · 仅一行桶全名 |
| 4 | PutObject 上传 tip tgz → `tips/` | **绿** · 探针 + W3 tip |
| 5 | TAT 拉到 `/tmp/limis-ops-incoming/` + sha256 | **绿** · MATCH |
| 6 | 不热换/不重启 Core | 遵守 |
| 7 | 本件落盘（无密钥） | 本文件（23:01 CST 收口） |

## 1. 桶（Mac 控台）

| 项 | 值 |
|---|---|
| 全名 | `limis-ops-xfer-cd-1339006584` |
| 地域 | `ap-chengdu`（成都） |
| ACL | 私有读写 |
| 冗余 | 单 AZ（成都暂不支持多 AZ） |
| 建桶方式 | Mac Chrome → COS 控台 → 创建存储桶（主账号） |
| 冲突 | 无，未加随机后缀 |
| 私库登记 | `/home/box/ops-private/tencent-cloud-client/xfer-bucket.txt` |

角色 `list_buckets` 可见：`limis-kb-backup-gz-1339006584`（广州，**未碰**）+ 本传包桶（成都）。

## 2. STS / Put

| 项 | 值 |
|---|---|
| RoleArn | `qcs::cam::uin/100012327461:roleName/limis-ops-cloud-deploy` |
| 子账号 Uin（基钥） | `100051565294` |
| Put 探针 | `tips/_ops_probe_put.txt` · **OK** |
| Put tip | `tips/core-tip-w3-flowcard-transfer.tgz` · **OK** · 99728 字节 |
| tip sha256 | `026948498e3680951b74ea9a8a0b21be1c26c88c53bdf881a9aeb174404c1bb3` |
| head_object tip | Content-Length=99728 |
| GetObject（盒） | **OK** · sha 一致 |
| 备注 | `head_bucket` 曾 403 Unknown，但 list/put/get 均绿；以 list+put 为准 |

## 3. TAT 拉包对账

| 项 | 值 |
|---|---|
| InstanceId | `lhins-hg459e98` |
| InvocationId | `inv-89wv960nq7` |
| 方式 | STS 预签名 GET（显式 `x-cos-security-token`）→ 机内 python urllib |
| 机内路径 | `/tmp/limis-ops-incoming/core-tip-w3-flowcard-transfer.tgz` |
| SIZE | `99728` |
| SHA | `026948498e3680951b74ea9a8a0b21be1c26c88c53bdf881a9aeb174404c1bb3` |
| MATCH | **yes** |
| TaskStatus | SUCCESS |
| 首次失败 | `inv-b9wv89gcv1` 预签名未带 token → curl 403；已改 |

## 4. tip 登记

| 项 | 值 |
|---|---|
| 本地源 | `/workspace/tips/core-tip-w3-flowcard-transfer/core-tip-w3-flowcard-transfer.tgz` |
| COS 对象键 | `tips/core-tip-w3-flowcard-transfer.tgz` |
| 机内落点 | `/tmp/limis-ops-incoming/core-tip-w3-flowcard-transfer.tgz` |
| 热换 Core | **未做**（红线；W3 另线） |

## 5. 产出

| 项 | 状态 |
|---|---|
| 传包桶全名 | `limis-ops-xfer-cd-1339006584` |
| COS 对象键 | `tips/core-tip-w3-flowcard-transfer.tgz` |
| 机内路径 / sha | `/tmp/limis-ops-incoming/...` · MATCH |
| TAT InvocationId | `inv-89wv960nq7` |
| 私库 `xfer-bucket.txt` | 已写 |

## 6. 给 Boss 一句大白话

> 桶建好了。全名 `limis-ops-xfer-cd-1339006584`（成都、私有）。角色能 Put；W3 tip 已传到 `tips/`，TAT 拉到机 `/tmp/limis-ops-incoming/`，sha 对上了。没动 Core、没碰 KB 备份桶。卡点已过：之前是 API 没建桶权，这次用你 Mac 主账号控台建的。

## 7. 过线 / 红线

- **已过：** Mac 控台建桶；STS Put/Get；TAT 拉包 sha MATCH；`xfer-bucket.txt`；本件。
- **遵守：** 案1/#893 不动；密钥不进频道/件；禁用 limis-kb-backup；不热换 Core。
