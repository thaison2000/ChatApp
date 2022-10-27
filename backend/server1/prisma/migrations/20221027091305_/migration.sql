-- AlterTable
ALTER TABLE `group` ADD COLUMN `type` ENUM('Chanel', 'DirectMessage') NOT NULL DEFAULT 'Chanel';
