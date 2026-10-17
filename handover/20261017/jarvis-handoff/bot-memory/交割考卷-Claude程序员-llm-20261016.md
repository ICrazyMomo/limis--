# 交割考卷 · Claude程序员-llm · 2026-10-16

> 只读作答：没改代码、没挂 tip、没开测、没写库、没碰公网。没有抄录任何密钥。挂上≠PASS，接口200≠PASS。
> 时间口径：artifacts 下的文件 mtime 全部是 2026-10-16 13:06:39–41 UTC（拷盘时间，`ls -l --time-style=full-iso` 看到的），**排不了先后**；下面一律按文件正文里写的 CST 时间比对。

## 时间线先说清（解决矛盾）
- HANDOFF-现状-20261016-0230.md 和 tip-handoff-in/HANDOFF-20261016-0230.md 内容完全一样（diff 无差异），写的是 **10-16 01:28–02:30 CST**：当时挂的四个 tip（ρ、开表503、A领样、B流转卡）被回滚冲掉，都没 LIVE，并下了全停令。
- 后面白天又重新开工：本 bot 08:28 首条消息（memory-full-20261016/Claude程序员-llm.md）；OPS-AFTER-ρ④…0d12df15 写探针时间 19:52:22 CST，结论 LIVE_OK；产品章最晚盖到 20:00（PRODUCT-STAMP-准修-ρ④-view-files…）；20:05 Boss 又下令「停 tip/VERIFY/改码，等 Jarvis 交接+Boss 再令」（memory-full-20261016/limis-研发.md seq3334–3338）。
- 结论：**HANDOFF 02:30 在前，OPS-AFTER 19:52 在后**，两份说的不是同一批 tip，不算真矛盾。20:05 之后有没有回滚 0d12df15：**不确定**（没找到回滚文件，DIAG-研3-ρ④-view-files… 和准修章都写了「不回滚 0d12/8877」）。
- 已知截止时间：全队最新是 10-16 20:05 Boss 停令，还没看到抬停令。

## Q1 停工快照是不是 12 项？各卡在哪？
**不是 12 项。** 快照分三块：「做了什么」7 条、「现状」2 条、「待办」6 条，一共 15 条（HANDOFF-现状-20261016-0230.md）。按「待办」6 条说卡点：
1. 四个 tip 重挂：卡在全停令；开表要补 Service，B 用小包覆盖，ρ/A 挂上后要复探，挂前必须 preflight，还要核 Core 启动参数（02:27 那次就是因为裸启连了 3306 才挂的）。
2. 安卓：开表503 HOLD，票A/B 要硬刷，测5 换代验收没开。
3. 运维密钥：腾讯云私库 client 要重注，等 Boss（我这里不碰）。
4. 研发 10-14 检讨待审，Word 发不发新号还没定。
5. 模板线：5189 重建、「Claude-llm 审查」、五成双、数据对齐屏侧债。
6. 红线（案1不动、不写密钥、挂上≠验收）——这条是规矩，不是待办。
另外：PRODUCT-STAMP-裁-报告⑤⑥与②④票面冻结-对齐12项（18:50）里有个「12 项总验收基线」，跟快照不是一回事。是不是题目说的 12 项：不确定。

**跟本 bot 有关的、还差什么：**
- 「模板线·Claude-llm 审查」：全部材料里只有 HANDOFF 这一处提到（全量聊天 rg 无结果），要审什么、交给谁都没写，**不确定**，得去问。
- 16:18 派的「报告配置 FE①」：FE① 18:17 已盖 PASS 章（PRODUCT-STAMP-裁-报告配置FE①-字段映射指纹-PASS），但只算指纹和落屏；报告⑦–⑪/②–⑥ 还冻着，禁出报告 tip（对齐12项章、代码理解§3.3#4）。等于现在没活可领。
- ρ：现成的 tip `deliver-tip-rho-view-files-skip-mark-fetched-20261016`（a3a7→0659318a，SELFTEST_STATIC_OK）已冻结：没 VERIFY、没放行、没挂（limis-研发.md 20:05）。
- 存草稿：Web 旁证 16:35 PASS；安卓 17:38 BLOCKED（卡在进表前，photo-context 503），禁止再装 tip。
- 要多久：恢复要等 Boss 抬停令、研发派活，**估不了，不确定**。

## Q2 ρ④ 和 W4⑫
**ρ④：LIVE 着，但验收 FAIL，没回滚。**
- 8877b2c1（VIEW_SESSION 改成 CARD_VIEW_SESSION）19:37 LIVE（OPS-AFTER-ρ-④-view-sessions…8877b2c1）。
- 0d12df15（documentKey 从 event_json 回读）19:50 放行，19:52 LIVE_OK（OPS-AFTER-ρ④…0d12df15）。
- 测3 19:55 开测 FAIL：view-sessions 业务200、key 不再报非法，但 OO 拉文件时撞上 SQL 异常「withdrawal events are immutable」，确认卡没进去（RESULTS/…0d12df15-view-sessions过-流转卡文件SQL失败…）。
- 根因：markViewFetched 对事件表发 UPDATE，撞到 trg_withdrawal_event_no_update 触发器（DIAG-研3-ρ④-view-files-SQLException-ae422873）。20:00 准修甲（零 UPDATE）。tip 已出，但被 20:05 停令冻住。**卡在：RD-VERIFY 之前。**

**W4⑫：没有 tip，走的是写库补数；现在卡在出样前 Web「应采计划」没确认。**
- 19:42 写库 OTL133 sampler_user_id NULL→1（admin），WRITE_OK，status 还是 01，回滚 SQL 没执行（OPS-WRITE-W4⑫①-OTL133-sampler=admin）。
- 之后 admin 能看到单了，但出样堵在「应采计划未配置保存确认」；19:51–19:53 产品裁：测2 走 Web 制作检测方案→配置应采计划→保存→确认，测4 HOLD；status=01 可能拒配，禁改 status（BA-CHAIN三问-W4⑫①…，PRODUCT-STAMP-裁-W4⑫①-见单通…、采信BA升钉…19:53）。
- 写库有没有回滚：没看到回滚记录，**不确定**。没有 W4 tip（对齐12项章：「W4 tip 无」）。

## Q3 产品章（共 681 份 PRODUCT-STAMP*，按票拣主线）
- 已过（PASS 章）：FE① 字段映射指纹 PASS（18:17）；存草稿 Web 旁证三线满 PASS（16:35）；开表双载热路径/进表可填 PASS（15:35/15:38，存草稿服务器那次 FAIL）。
- 已放行、已 LIVE，但开测 FAIL 或 BLOCKED：ρ④ 0d12df15（19:58 裁 FAIL）；⑤ FE 13c59b98（19:53 放行，19:56 开测章，结果**不确定**）；安卓 photo-context（96960d09 开测 FAIL，96fdd293 那次 C2 PASS、C1 锁、E4 503 FAIL）。
- 准修已盖、还没挂：ρ④ view-files 零 UPDATE（20:00，研3出包，卡在停令）。
- 冻结：报告②–⑥（⑦–⑪），等测5 PUT/拒包枪和数据补齐；19:55 Boss 准造数（PRODUCT-STAMP-Boss裁-报告⑦–⑪-准造数…），由 BA+运维补。
- 安卓存草稿：17:38 BLOCKED，球在运维 DIAG photo-context 503 和研2 DIAG Tab 不切换。
- W4⑫①：在测2（Web 确认应采计划），测4 HOLD；甲 FAIL 就升 Boss。
- ★0402：资料闸 approvalAllowed=false，等 DIAG+BA+产品令（代码理解§3.3#8）。

## Q4 最近的代码改动和原因（代码快照没带 .git，以下依据 代码理解-limis-研发组-20261016.md §3/§4 及分件）
- 8877b2c1：写 VIEW_SESSION 违反 ck_withdrawal_event_type，导致 500 → 统一成 CARD_VIEW_SESSION。依据 DIAG-研3-ρ-④-view-sessions500-VIEW_SESSION改CARD_VIEW_SESSION、BA-升钉-ρ终态②-…VIEW_SESSION错配。
- 0d12df15：表里已经没有 document_key 列，读出来是 null，OO 报 key 非法 → 改成从 event_json 回读。依据 DIAG-研3-ρ④-OnlyOffice-document.key非法-event_json未回读、BA-半钉-ρ④-OnlyOffice-合法document.key出处。
- skip-mark-fetched（冻结没挂）：去掉对不可改事件表的 UPDATE。依据 DIAG-研3-ρ④-view-files-SQLException-ae422873。
- 13c59b98 ⑤ FE：失败时丢掉 pending，查询永远用库里的 requestId。依据 DIAG-研3-⑤-view-sessions后新错键5a0441dc-FE-de8c24dc。
- 开表 503 系列（d803b4ac/d014d4be/9d445db2/7f5ac46b/3ee2ebff/7be589f7）：分层修冻空、version CCE、SEF 静默断、precision Integer、双载、缺 Filter。依据 DIAG-研2-开表503-* / 开表Integer-* / 开表建SEF-*。
- 存草稿（8b950842 / f0c536ec）：依据 DIAG-研2-开表存草稿-服务器values未落、DIAG-研2-安卓存草稿-PUT503-ENTRY_TEMP-早退点、BA-半钉-开表存草稿成功-哪钮哪表何态。
- 报告 FE①（a122a74b / b2e9b766）：依据 DIAG-研4-FE①-仍拉旧CKI1oexn、DIAG-研4-FE①-CKIfe1ent-Ye-is-not-a-function。
- ★0402（ccf06480 / 8c6ed4b9）：OUTER 绑定空挫、void stub 导致 NSME。对应的 DIAG 文件名这次没逐份核，**不确定**。
- 快照代码里每处改动在哪一行，没有 .git 对不上，**不确定**。

## Q5 跟编译/写码专线有关的门禁和红线
- 人设门禁（bot-memory/00-各bot人设与门禁.md）：编译、写码、排查、审查都必须在本机 box 做（JDK8+JDK17+Maven3.9），禁用云端 VM；改码必须有 BA 出处+产品准修章。16:18 指令：本机 JDK8，有准修章才改。
- BOSS 六步（BOSS-固化-…六步）：三线矩阵不齐不开工；研发自测要三线全跑，缺一条负例整份不交；挂包前由运维只读核版本。
- 门禁⑧–⑰（同文件）：⑧ event_type 合法枚举；⑨ API 字段改名/默认值要对表；⑩ 可见性过滤；⑪ 状态和事件原子写或可对账；⑫ 不同账号分开验收；⑬ 环境问题和代码问题分开；⑭ 重试幂等；⑮ FE/BE 契约钉死，老 tip 配新包不许悄悄出错；⑯ 时区统一；⑰ 负例来源由产品写进基线。
- 写码惯例（代码理解§3、§5）：major 52（javac 1.8）；禁自己 LIVE；SELFTEST_STATIC_OK≠PASS；分票不并（ρ④/⑤）；禁 DDL 卸触发器；禁复挂 66dee101/c2064a62；禁复叠 96960d09 同面。
- 红线：案1 QC-900421 不动；不写密钥；对外发消息先问 Boss；公网写库要 Boss 明示（R1–R4）；当前停令：停 tip/VERIFY/改码。

## Q6 提问清单
1. 问 Jarvis：HANDOFF 里的「模板线·Claude-llm 审查」审什么、什么时候交、交给谁？
2. 问 Boss：20:05 的停令什么时候抬？抬了以后本 bot 是先接 ρ view-files 包的复核，还是别的？
3. 问 limis-研发：FE① 已 PASS、报告线又冻着，16:18 派的「FE① 或 ρ/存草稿票」现在实际给我哪张？接口人是谁？
4. 问 limis-运维：20:05 之后 0d12df15 / 8877b2c1 是不是还 LIVE？W4 sampler 那次写库回滚没有？
5. 问 limis-产品：安卓存草稿 BLOCKED 解闸以后，ENTRY_TEMP 是另令重刷，还是要出新 tip？
6. 问 limis-业务分析：W4⑫① 在 status=01 下能不能配应采计划？有没有书面出处？
