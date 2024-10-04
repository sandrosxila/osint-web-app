CREATE TABLE IF NOT EXISTS `scan_results` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `domain_name` varchar(255) DEFAULT NULL,
    `end_time` datetime(6) DEFAULT NULL,
    `output_data` text,
    `start_time` datetime(6) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;