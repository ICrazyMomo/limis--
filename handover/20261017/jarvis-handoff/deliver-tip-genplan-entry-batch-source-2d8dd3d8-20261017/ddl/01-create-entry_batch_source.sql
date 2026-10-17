-- 准甲 · 空表建表 · entry_batch_source
-- 出处：PRODUCT-STAMP-准修-生成方案-甲补建entry_batch_source+乙FE露因-20261017.md（盘 1e894132）
--       定案 b1bf36ca · DIAG 502f7a89 · OPS-RO 9f4e103e · OPS-DIAG-测5-回读闸
-- SQL 证据列（禁猜）：select file_key, source_json, source_sha256, created_at
--                      from entry_batch_source where actor_id=? order by created_at desc, file_key desc
-- 栈：EntryBatchReceiptService.requireSource/beginSave/status/findActiveDraft
-- 红线：只建空表；禁 INSERT 业务行；案1不动；密钥不进件；挂上≠PASS；禁自 LIVE
-- 运维：本 DDL BEFORE 挂 FE/Core 包（本 tip FE 可同挂；表须先于 force-save 业务成功）

CREATE TABLE IF NOT EXISTS `entry_batch_source` (
  `actor_id` bigint NOT NULL COMMENT '操作人/属主（WHERE actor_id=?）',
  `file_key` varchar(64) NOT NULL COMMENT '文档 fileKey（SELECT 列）',
  `source_json` mediumtext NOT NULL COMMENT '来源 JSON（SELECT 列 source_json）',
  `source_sha256` char(64) NOT NULL COMMENT '来源摘要（SELECT 列 source_sha256）',
  `created_at` datetime(3) NOT NULL COMMENT '创建时间（ORDER BY created_at desc）',
  PRIMARY KEY (`file_key`),
  KEY `idx_ebs_actor_created_file` (`actor_id`, `created_at`, `file_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
  COMMENT='批量录入/完成收据来源（空表；EntryBatchReceiptService 硬依赖）';
