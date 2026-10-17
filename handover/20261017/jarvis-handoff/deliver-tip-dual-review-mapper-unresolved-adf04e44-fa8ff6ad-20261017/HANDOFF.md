# HANDOFF · 双审 Mapper tip · selectUnresolvedProblemIdsForUpdate

- **时刻**：2026-10-17 07:49:00 +0800 Asia/Shanghai
- **执行**：Claude程序员-llm · 本机 JDK8 · **禁自 LIVE**
- **准修**：`fa8ff6ad` · **DIAG**：`5f22ae22` · RO `3c80d5d5` · 裁 `af12d452` · 定盘求准修 `20c0b04b`
- **叠基 FINAL**：`167513940fcd1f9f`（6bab LIVE 后；**不是**旧 7080b882）
- **ORIG** Mapper.class=`f87b79c3ced64448` · ORIG xml=`a305b1d371af6551`（=现网 LIVE NEW，保留 ForUpdate+甲案）

## 结论先行

补 `QltWorkOrderMapper.selectUnresolvedProblemIdsForUpdate(Long)→List` **接口+XML（FOR UPDATE）**；**保留** `selectByIdForUpdate` + 甲案 `advanceStatusWithOpenCount`；**拒**回退 selectById；**不并** WO33；**禁复灌** `6bab49cf`。

| 项 | 值 |
|---|---|
| NEW class sha16 | **`30bbb73e75c12fb5`** |
| NEW xml sha16 | **`958de353f30e6cae`** |
| tip 短 sha | `adf04e44` |
| 分支 | `tip/dual-mapper-unresolved-on-16751394-20261017` |
| tip tag | `tip/adf04e44-on-16751394` |
| 叠基 FINAL | `167513940fcd1f9f` |
| 放行章 | **尚无放行章**（待 RD-VERIFY） |

## 产物路径
`/workspace/artifacts/deliver-tip-dual-review-mapper-unresolved-adf04e44-fa8ff6ad-20261017/`

## 全量覆写（仅 Mapper class+xml · OUTER+NESTED）
- `BOOT-INF/classes/com/lei/system/mapper/QltWorkOrderMapper.class` + nested `lei-system` 同路径 → `30bbb73e75c12fb5`
- `BOOT-INF/classes/mapper/system/QltWorkOrderMapper.xml` + nested 同路径 → `958de353f30e6cae`

## 明确不覆写（逐一）
| 面 | 声明 |
|---|---|
| 共享入口 Contoller | **不覆写** |
| ServiceImpl | **不覆写** |
| Auth / QltReviewAuthorizationService | **不覆写** |
| FE | **不覆写** |
| WO33 资料闸 | **不并本包** |

## 禁
禁自 LIVE · 禁复灌 `6bab49cf` · 禁只改 FE · 禁卸触发器 · 禁回退 selectById · 禁案1 · 禁写库

请 **limis-研发 RD-VERIFY**。禁自 LIVE。

## tgz
- `/workspace/artifacts/tip-dual-review-mapper-unresolved-adf04e44-fa8ff6ad-20261017.tgz`（交件目录内同步 `tip-*.tgz`）
- sha16=`**43abc144ed27231d**` · 见 `SHA16-TGZ.txt` / `stamps/TGZ.sha16` / `tip-dual-review-mapper-unresolved-adf04e44-fa8ff6ad-20261017.tgz.sha256`
