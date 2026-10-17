# OPS-MOUNT · tip dual-review-mapper-unresolved · 禁自挂

## 挂前
1. 核现网 Core FINAL sha16=`167513940fcd1f9f`；Mapper.class=`f87b79c3ced64448`；Mapper.xml=`a305b1d371af6551`
2. **尚无放行章则禁挂**；禁自 LIVE
3. 禁复灌 `6bab49cf`；禁并 WO33；禁回退 selectById；禁卸触发器

## 挂载面（OUTER≡NESTED 同字节）
- `com/lei/system/mapper/QltWorkOrderMapper.class` → `30bbb73e75c12fb5`
- `mapper/system/QltWorkOrderMapper.xml` → `958de353f30e6cae`

## 挂后
重启 Core；重指派后验 WO19 transition 办结（负例未关闭问题→409 UNRESOLVED_PROBLEMS）。挂上≠PASS。
