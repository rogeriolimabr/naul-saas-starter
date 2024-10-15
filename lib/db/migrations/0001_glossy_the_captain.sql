ALTER TABLE `holding` ADD `plan` text(20) DEFAULT 'FREE' NOT NULL;
ALTER TABLE `holding` ADD `plan_expires_at` integer;
ALTER TABLE `bp_takedowns` ADD `created_by` text(50);