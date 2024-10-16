CREATE TABLE `ics_devices` (
	`id` text PRIMARY KEY NOT NULL,
	`vendor` text(100) NOT NULL,
	`product` text(100) NOT NULL,
	`name` text(50) NOT NULL,
	`dork` text(100) NOT NULL,
	`status` text(20) DEFAULT 'ACTIVE' NOT NULL,
	`version` text(20),
	`comments` text(500),
	`created_at` integer NOT NULL,
	`updated_at` integer
);
