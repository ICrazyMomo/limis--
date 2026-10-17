# 云端出包 Environment / 缓存 · 可落地步清单 · 2026-10-15

**状态：** §3.1–3.5 与 §3.6 均已盖章 → Environment/缓存 + 大 jar 强制交件一并落地；硬验收：开工→可启动 package ≤5 分钟  
**依据：** `PLAN-云端出包持久缓存优化-2026-10-15.md` + 样品交接实测（墙钟~12分 / 写码~11分 / package~28s）  
**红线：** 案1 不动；本优化不进公网业务 tip；密钥不进频道  

---

## 0. 先钉死口径（给 Boss / 产品）

| 说人话 | 含义 |
|---|---|
| 缓存主要压「改完就打」 | 热仓重编目标 **30–90 秒**；验收建议：改 1 个类再 package **≤2 分钟**（命令段墙钟） |
| 不解决「从零写接口」 | 样品交接那种新功能仍以写码为主，整次 tip 不会腰斩 |
| 今晚样品交接主因是写码 | Maven package 本身已 ~28s，依赖有少量冷下载；环境预热仍值得做，但别承诺整单变快一半 |

---

## 1. 产品书面确认闸（§3，未勾齐禁止改 Environment）

- [ ] **C1** ✅已准 建/改 Cursor 云端 Environment：持久 `~/.m2` + Temurin JDK8 预装，作为研发标准出包环境  
- [ ] **C2** ✅准条件 出包默认 `-DskipTests`（或只跑 tip 自带单测类）；并写清与「三线自测」怎么对齐（自测仍在 tip 内做，不靠全量 `mvn test` 双跑）  
- [ ] **C3** ✅准条件 是否允许同分支 tip **复用 `lei-*/target`**；若允许，必须同时批准 `clean` 触发条件（换分支 / 大合入 / 依赖大变 / 脏构建嫌疑）  
- [ ] **C4** ✅已准 验收句采用：热仓改 1 个类再 package **≤2 分钟**（墙钟·命令段）算过  
- [ ] **C5** ✅已准 确认本优化 **只动云端出包环境 / 门禁文档**，不进公网业务 tip；与案1无关  


- [x] **C6** ✅已强制 大 jar 交件：>100MB 必须 gzip，仍超则分片；0 字节 = FAIL；HANDOFF 写清单（PRODUCT-STAMP §3.6）。
- [x] **C7** 硬验收（Jarvis 转述 Boss）：开工→可启动 `mvn package` ≤5 分钟。

**盖章动作：** 产品书面确认（PRODUCT-STAMP 或等价一页）→ 本 Bot 才开始配 Environment。

---

## 2. Environment 落地步（产品确认后按序做；确认前整节冻结）

### 2.1 环境载体（二选一，优先可版本化）

| 步 | 动作 | 成功标准 |
|---|---|---|
| E1 | 在仓库默认分支提交 `.cursor/environment.json`（或团队已有 Environment 上改同一套） | 云端 Agent 解析到该环境；Builds 页可见新版本 |
| E2 | Dockerfile（可选，进阶）固化系统层：Temurin **JDK 8** + **Maven 3.9.x**；**禁止** `COPY` 整仓 | 镜像层只装工具链；工作区仍由 Cursor checkout |
| E3 | 不用 Dockerfile 时：在 `install` 里幂等安装 JDK8/Maven（已存在则跳过） | `java -version` → 1.8.x；`mvn -version` → 3.9.x + Java 1.8 |

**推荐 `environment.json` 骨架（确认后填实，勿提前合主干）：**

```json
{
  "install": "bash .cursor/cloud-install-limis.sh",
  "start": ""
}
```

- `install`：只放「写盘可复用」的事（装 JDK/Maven、预热 `~/.m2`、可选预编译）  
- `start`：**不要**放依赖下载；只放每 boot 要起的服务（本出包线通常可空）  
- Cursor Build 会快照磁盘态 → `~/.m2/repository` 会进后续 Agent 开局，实现持久依赖缓存  

### 2.2 `cloud-install-limis.sh` 必须做的事（幂等）

| 步 | 命令意图 | 成功标准 |
|---|---|---|
| I1 | 确保 `JAVA_HOME` 指向 JDK8；`PATH` 含 `java`/`mvn` | 打印 `java -version` 含 `1.8`；失败 **exit 1**（禁止边跑边装） |
| I2 | 确保 Maven 3.9.x；`MAVEN_OPTS` 默认 `-Xmx2g`（可按机器调） | `mvn -version` 正常；无「又下了一遍 Maven」噪音 |
| I3 | 预热依赖：`mvn -q -DskipTests dependency:go-offline`（或等价：对父 POM + `lei-system`/`lei-admin` 做一次 skipTests package） | `~/.m2/repository` 已有主依赖；后续 tip 冷 Downloading 接近 0 |
| I4 | （可选）默认分支上 `mvn -pl lei-admin -am package -DskipTests` 一次，把常见 `target` 暖进 Build | 仅作冷启动加速；**feature tip 仍按门禁决定是否 clean** |
| I5 | 全程幂等：可重复跑；缺啥补啥，不删无关缓存 | 二次 Build 明显更快或几乎 no-op |

### 2.3 Agent 开局烟测（写进研发门禁 / AGENTS.md 云端段）

每个出包 tip **先跑、失败即停**：

```bash
java -version 2>&1 | head -3    # 必须见 1.8
mvn -version | head -5          # 必须见 Maven 3.9 + Java 1.8
test -d "$HOME/.m2/repository" && echo "m2_ok"
```

不通过 → 停，回报「环境未就绪」，禁止临时 apt/sdkman 边装边编。

---

## 3. 出包命令与缓存策略（落地后门禁）

### 3.1 标准出包命令（Core / Web jar 主线）

```bash
# 默认（产品 C2 批准后）
mvn -pl lei-admin -am package -DskipTests

# tip 自带单测类时（示例）
mvn -pl lei-admin -am test -Dtest=FooTest,BarTest
mvn -pl lei-admin -am package -DskipTests
```

| 禁令 | 原因 |
|---|---|
| 禁止「先全量 `test` 再带测 `package`」双跑 | 样品交接量级多浪费 ~10s，习惯上应砍 |
| 禁止 tip 内现装 JDK/Maven | 环境烟测失败应回报，不自救装机 |

### 3.2 `~/.m2` 持久化（主收益）

| 场景 | 预期 |
|---|---|
| 冷仓首次（无 m2 / 新依赖） | 依赖下载接近 0（镜像/Build 已预热）；编译仍可能 30–60s |
| 热仓增量（改少数 Java） | package **30–90s**；整体命令段目标 **≤2 分钟** |

### 3.3 `target` 复用（仅当产品 C3 批准）

| 规则 | 动作 |
|---|---|
| 同分支连续小改 tip | 可保留 `lei-*/target`，用 `-am` 增量 |
| 换分支 / 大合入 / POM 大变 / 怀疑脏构建 | **必须** `mvn -pl lei-admin -am clean package -DskipTests`（或等价 clean） |
| 未批准 C3 | 每次 tip 默认带 `clean`，只吃 m2 缓存收益 |

### 3.4 Web / `node_modules`（本阶段次要）

样品交接以 Core jar 为主。若后续 tip 打前端 dist：`node_modules` 同理放进 `install` 预热；本清单首期 **不阻塞** Environment 主线。

---

## 4. 验收与报时口径（落地后测一次）

| 步 | 谁做 | 做什么 | 过线 |
|---|---|---|---|
| V1 | 云端出包优化 + 研发 | 产品盖章后配好 Environment，触发一次成功 Build | Builds 绿；烟测 1.8 过 |
| V2 | 研发 | 样品交接同类：**只改 1 个已有类** 的小 tip，记命令段墙钟 | ≤2 分钟（若 C4 批准） |
| V3 | 研发交接 | HANDOFF 分两栏报：**冷仓首包** vs **热仓重包**；勿把写码时间算进出包 | 数字可复核 |
| V4 | 运维/研发门禁 | 标准命令 + JDK8 证明 + 单次 package + sha16 + HANDOFF 写入额度交接清单 | 文档生效 |

---

## 5. 落地序（确认后；确认前停在本清单）

1. 产品勾齐 §1 / 方案§3 → 书面章  
2. 本 Bot：写 `.cursor/cloud-install-limis.sh` + `environment.json`（或改团队 Environment）→ 出 Build  
3. 研发：热仓小改 tip 实测耗时 → 回填 V2  
4. 门禁文档更新（出包命令、烟测、冷/热报时）  
5. **全程不碰案1；不把本优化打进公网业务 tip**

---

## 6. 回执摘要（给 Jarvis）

- 方案已精读；根因口径对齐：主耗时在写码，缓存主压热仓重编。  
- 本文件给出 Environment / m2 / 烟测 / 出包命令 / clean 触发 / 验收四步的可勾选清单。  
- **产品书面确认前环境零改动。**  
- 待产品盖章后，本 Bot 执行 §2–§4。  

件路径：`/workspace/artifacts/CHECKLIST-云端出包Environment缓存步骤-2026-10-15.md`  
母方案：`/workspace/artifacts/PLAN-云端出包持久缓存优化-2026-10-15.md`


---

## 7. 大 jar 交件步骤（§3.6 已强制）

实测旁证：样品交接 tip 已对 ~112MB `lei-admin.jar` 做 `split` 分片交件（part-aa/ab + SHA256SUMS），避免 0 字节。

| 步 | 动作 | 成功标准 |
|---|---|---|
| J1 | `stat -c%s` 源 jar；若 ≤100MB 可原样拷（仍核 >0） | 字节数与源一致 |
| J2 | 若 >100MB：优先 `gzip -9 -c jar > jar.gz`；若 gz 仍 >100MB → `split -b 90m` | artifacts 内无单文件 >100MB |
| J3 | HANDOFF 写：原名、原字节、交件形态（gz/分片清单）、sha256、合并/解压命令 | 运维可按清单还原 |
| J4 | 交件后对 artifacts 内每个文件 `stat`；**0 字节 = FAIL**，禁止报交件成功 | 全文件 >0 |

母方案已补 §3.6：`PLAN-云端出包持久缓存优化-2026-10-15.md`
