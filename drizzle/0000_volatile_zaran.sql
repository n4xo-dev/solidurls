CREATE TABLE `short_urls` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`url` varchar(1024),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `short_urls_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `url_idx` ON `short_urls` (`url`);