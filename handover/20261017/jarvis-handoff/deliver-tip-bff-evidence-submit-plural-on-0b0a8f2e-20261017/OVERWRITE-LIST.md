## 全量覆写清单
| # | 目标路径（LIVE 相对） | 类/资源 | 挂前 PRE sha8 | 挂后 NEW sha8 | 备注 |
|---|---|---|---|---|---|
| 1 | BOOT-INF/classes/com/lei/mobile/evidence/PointEvidenceController.class（lei-mobile-bff.jar 内） | PointEvidenceController | fab1cbbe | b987a3f4 | 主改：submit 转发→Core 复数口；PRE 全长前16=fab1cbbed675e551；NEW 前16=b987a3f4c0aea0be |

### 包内将被挂上的文件树 ↔ 本表
- `classes/com/lei/mobile/evidence/PointEvidenceController.class` → 上表 #1
- **无**其它 class/dist/chunk；未带出 EvidencePackageCoreClient / SubmitController（意图未改、字节未改、不挂）
- tip 包文件树若出现未声明挂上件 → VERIFY **FAIL**（本表已全量）

### sha 全长
| 角色 | sha256 |
|---|---|
| PRE（挂前须≡） | `fab1cbbed675e551c33e0ee249981245f40dbf0033216a32c136da6878a5d853` |
| NEW（挂后须≡） | `b987a3f4c0aea0bee448ba28ae8af7366df160cfe7ea6ad0bd4405a6b2bc659e` |
| 叠基 BFF FINAL jar sha16 | `0b0a8f2e`（全长见 EXTRACT meta；挂时运维对账现网） |
