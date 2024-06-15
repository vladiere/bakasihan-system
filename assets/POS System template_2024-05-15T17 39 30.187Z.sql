CREATE TABLE `menu_items_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`name` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	`price` DECIMAL(10000, 2) NOT NULL,
	`category_id` INT NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `category_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`name` VARCHAR(255) NOT NULL,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `order_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`customer_id` INT NOT NULL,
	`order_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`total_amount` DECIMAL(1000000,2) NOT NULL,
	`payment_status` ENUM("'pending'", "'hold'", "'reserve'", "'paid'") NOT NULL DEFAULT 'pending',
	`completed` ENUM("'not done'", "'done'") NOT NULL DEFAULT 'not done',
	PRIMARY KEY(`id`)
);

CREATE TABLE `order_item_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`order_id` INT NOT NULL,
	`item_id` INT NOT NULL,
	`quantity` INT NOT NULL,
	`item_price` INT NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `cashier_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`detail_id` INT NOT NULL,
	`login_id` INT NOT NULL,
	`role` ENUM("'head'", "'sub'", "'parttime'") NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `admin_able` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`detail_id` INT NOT NULL,
	`login_id` INT NOT NULL,
	`role` ENUM("'super'", "'admin'", "'subadmin'") NOT NULL DEFAULT 'admin',
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `customer_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`detail_id` INT NOT NULL,
	`brgy` VARCHAR(255) NOT NULL,
	`city` VARCHAR(255) NOT NULL,
	`province` VARCHAR(255) NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `vacancy_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`table_number` INT NOT NULL,
	`status` ENUM("'vacant'", "'occupied'", "'reserved'") NOT NULL DEFAULT 'vacant',
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `login_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`username` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`ctime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	`mtime` TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`id`)
);

CREATE TABLE `detail_table` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`full_name` VARCHAR(255) NOT NULL,
	`email_address` VARCHAR(255),
	`phone_number` VARCHAR(255),
	PRIMARY KEY(`id`)
);

ALTER TABLE `order_table`
ADD FOREIGN KEY(`customer_id`) REFERENCES `customer_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `customer_table`
ADD FOREIGN KEY(`detail_id`) REFERENCES `detail_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `cashier_table`
ADD FOREIGN KEY(`detail_id`) REFERENCES `detail_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `admin_able`
ADD FOREIGN KEY(`detail_id`) REFERENCES `detail_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `login_table`
ADD FOREIGN KEY(`id`) REFERENCES `admin_able`(`login_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `login_table`
ADD FOREIGN KEY(`id`) REFERENCES `cashier_table`(`login_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `order_item_table`
ADD FOREIGN KEY(`order_id`) REFERENCES `order_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `order_item_table`
ADD FOREIGN KEY(`item_id`) REFERENCES `menu_items_table`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;