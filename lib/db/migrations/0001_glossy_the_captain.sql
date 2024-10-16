ALTER TABLE `holding` ADD `plan` text(20) DEFAULT 'FREE' NOT NULL;--> statement-breakpoint
ALTER TABLE `holding` ADD `plan_expires_at` integer;--> statement-breakpoint
ALTER TABLE `bp_takedowns` ADD `created_by` text(50);