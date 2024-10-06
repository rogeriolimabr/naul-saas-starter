-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `permissions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`routes` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`id` text PRIMARY KEY NOT NULL,
	`role_id` text NOT NULL,
	`permission_id` text NOT NULL,
	`related_on` integer NOT NULL,
	FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `team_members` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`team_id` text NOT NULL,
	`role_id` text,
	`joined_at` integer NOT NULL,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`role_id` text NOT NULL,
	`related_on` integer NOT NULL,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`email` text(255) NOT NULL,
	`password_hash` text NOT NULL,
	`holding_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	FOREIGN KEY (`holding_id`) REFERENCES `holding`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text(155) NOT NULL,
	`email` text(255) NOT NULL,
	`cnpj` text(14) NOT NULL,
	`avatar_url` text,
	`is_master` integer DEFAULT false,
	`holding_id` text,
	`status` text(20) DEFAULT 'ACTIVE' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`short_name` text(155) DEFAULT 'ADINT' NOT NULL,
	FOREIGN KEY (`holding_id`) REFERENCES `holding`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `holding` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`status` text(20) DEFAULT 'ACTIVE' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `bp_takedowns` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`description` text(100) NOT NULL,
	`frequency` text(10) NOT NULL,
	`priority` text(10) NOT NULL,
	`status` text(20) DEFAULT 'ACTIVE' NOT NULL,
	`category` text(50) NOT NULL,
	`origin` text(50) NOT NULL,
	`url` text(50) NOT NULL,
	`comments` text(500),
	`created_at` integer NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `bp_trackings_credentials` (
	`id` text,
	`login` text(150) NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `bp_trackings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bp_trackings_credit_cards` (
	`id` text,
	`card_bin` text(6) NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `bp_trackings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bp_trackings_keywords` (
	`id` text,
	`keywords` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `bp_trackings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bp_trackings_registrations` (
	`id` text,
	`type` text(50) NOT NULL,
	`registration` text(50) NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `bp_trackings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bp_trackings_social_networks` (
	`id` text,
	`social_network_name` text(50) NOT NULL,
	`username` text(50) NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `bp_trackings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bp_trackings_urls` (
	`id` text,
	`type` text(50) NOT NULL,
	`url` text(50) NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `bp_trackings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bp_trackings` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`description` text(100) NOT NULL,
	`frequency` text(10) NOT NULL,
	`priority` text(10) NOT NULL,
	`status` text(20) DEFAULT 'ACTIVE' NOT NULL,
	`aux_table` text(50) NOT NULL,
	`category` text(50) NOT NULL,
	`comments` text(500),
	`created_at` integer NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `permissions_name_unique` ON `permissions` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `roles_name_unique` ON `roles` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_unique_idx` ON `users` (`email`,`holding_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `companies_cnpj_unique` ON `companies` (`cnpj`);
*/