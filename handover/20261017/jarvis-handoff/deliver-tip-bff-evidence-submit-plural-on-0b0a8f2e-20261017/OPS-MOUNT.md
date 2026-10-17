# OPS-MOUNT · BFF tip · evidence-submit-plural · 20261017

**Claude程序员-mod / 研 不自挂。** 须产品放行 + RD-VERIFY 后再挂。

1. 对账现网 BFF jar sha16 须以运维钉 **0b0a8f2e** 为准；若漂 → 停挂
2. 备份 jar 内 `BOOT-INF/classes/com/lei/mobile/evidence/PointEvidenceController.class`
   - 挂前 PRE sha 应=`fab1cbbed675e551c33e0ee249981245f40dbf0033216a32c136da6878a5d853`（前16=`fab1cbbed675e551`）
   - 若 PRE ≠ 上值：停挂对账
3. 用本包 `classes/com/lei/mobile/evidence/PointEvidenceController.class` 覆盖（NEW=`b987a3f4c0aea0bee448ba28ae8af7366df160cfe7ea6ad0bd4405a6b2bc659e`）
4. **勿**替换 EvidencePackage* / PointUnit*（本 tip 未改）
5. 重启 BFF；**不**改 Core、nginx、库、案1、photos502
6. 挂后 class sha 应=NEW；喊测/RD 按验收句
7. 回滚：还原 `orig/PointEvidenceController.class` 后重启

## # --- ops-mount-meta ---
mode: core-overlay
target: bff
class: com.lei.mobile.evidence.PointEvidenceController
forbid: photos502,case1,nginx,db,CoreEntry,self-LIVE
stack_on_bff_final: 0b0a8f2e
stack_on_bff_class: fab1cbbed675e551
marker: TIP_BFF_EVIDENCE_SUBMIT_PLURAL_ON_0b0a8f2e_20261017
## # --- end ops-mount-meta ---

挂上≠PASS。禁自挂。
