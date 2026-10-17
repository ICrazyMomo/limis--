# OPS-MOUNT · tip dual-review-mapper-forupdate · 禁自挂

## 挂前
1. 核现网 Core FINAL sha16=`7080b882`；Mapper.class=`7ea03915`；Mapper.xml=`297684b8`
2. **尚无放行章则禁挂**；禁自 LIVE
3. 禁并 WO33；禁盲 tip71 再灌；禁回退 selectById

## 挂载面（OUTER≡NESTED 同字节）
- `com/lei/system/mapper/QltWorkOrderMapper.class` → `f87b79c3ced64448`
- `mapper/system/QltWorkOrderMapper.xml` → `a305b1d371af6551`

## 挂后
重启 Core；重指派后验 WO19 transition 办结。挂上≠PASS。
