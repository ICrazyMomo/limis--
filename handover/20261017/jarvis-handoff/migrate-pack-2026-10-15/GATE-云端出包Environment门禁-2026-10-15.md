# GATE · 云端出包 Environment / 缓存门禁 · 2026-10-15

**依据：** PRODUCT-STAMP-准-云端出包持久缓存优化基线 · 方案 PLAN-云端出包持久缓存优化  
**适用：** Web/Core 云端 tip 出包（JDK8）；安卓另线 JDK17  
**红线：** 案1不动；本优化不进公网业务 tip  

## 已生效（产品已准）

1. **烟测（失败即停）**  
   `java -version` 须见 1.8；`mvn -version` 须见 Maven 3.9 + Java 1.8。禁止 tip 内现装 JDK/Maven。

2. **标准出包命令**  
   `mvn -pl lei-admin -am package -DskipTests`  
   或 tip 自带单测类时先 `mvn -pl lei-admin -am test -Dtest=…` 再 package。  
   **禁止**先全量 test 再 package 双跑。  
   **`-DskipTests` 不准替代**交运维前「库×屏×钮三线正负例」自测；GATE 自洽不过仍 BLOCK。

3. **target 复用**  
   同分支连续 tip 可复用 `lei-*/target`。  
   **必须 clean：** 换分支、合入公共基线、依赖/父 POM 变、GATE/冒烟疑脏构建、产品或研发口令 clean。

4. **报时**  
   HANDOFF 分栏：**冷仓首包** vs **热仓重包**（仅命令段墙钟，不含写码）。  
   验收：热仓改 1 类再 package **≤2 分钟**（命令段）算过。

5. **大 jar 交件（§3.6 强制）**  
   >100MB **必须** gzip；gz 仍 >100MB 则分片（建议 ≤90MB/片）；**0 字节 = FAIL**；HANDOFF 写原名/原字节/形态/sha256/还原命令。≤100MB 可原样但须核 >0。详见 CHECKLIST §7、PRODUCT-STAMP §3.6。

6. **硬验收（Jarvis 转述 Boss）**  
   tip **开工 → 能启动 `mvn package` ≤5 分钟**（烟测+依赖就绪；不含写码）。热仓改 1 类 package 命令段 **≤2 分钟**。HANDOFF 报前后对比。

## 待 Environment 强化合入后

- install 在有 lei-admin 反应器时预热 `~/.m2`（dependency go-offline / skipTests package）  
- main 无代码时：用包装基线分支稀疏拉仓预热（见 PR 说明）  
- `MAVEN_OPTS=-Xmx2g` 固化  

