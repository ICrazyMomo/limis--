# HANDOFF · 双审病① Mapper tip · selectByIdForUpdate

- **时刻**：2026-10-17 07:11:18 +0800 Asia/Shanghai
- **执行**：Claude程序员-llm · 本机 JDK8 · **禁自 LIVE**
- **准修**：`5a7a195b` · **DIAG**：`09c1992d` · 叠 FAIL `64372ea0`
- **叠基 FINAL**：`7080b882` · ORIG Mapper.class=`7ea03915` · ORIG xml=`297684b8`

## 结论先行

补 `QltWorkOrderMapper.selectByIdForUpdate(Long)` **接口+XML（FOR UPDATE）**；**保留**甲案 `advanceStatusWithOpenCount`；**拒**回退 selectById；**不并** WO33。

| 项 | 值 |
|---|---|
| NEW class sha16 | **`f87b79c3ced64448`** |
| NEW xml sha16 | **`a305b1d371af6551`** |
| tip 短 sha | `6bab49cf` |
| tip tag | `tip-mapper-forupdate-f87b79c3ced64448` |
| 放行章 | **尚无放行章**（待 RD-VERIFY） |

## 产物路径
`/workspace/artifacts/deliver-tip-dual-review-mapper-forupdate-5a7a195b-20261017/`

请 **limis-研发 RD-VERIFY**。禁自 LIVE。

## tgz
- `/workspace/artifacts/deliver-tip-dual-review-mapper-forupdate-5a7a195b-20261017.tgz`
- sha 见 `deliver-tip-dual-review-mapper-forupdate-5a7a195b-20261017.tgz.sha256`（sha16=`0007feb696b368d8`）
