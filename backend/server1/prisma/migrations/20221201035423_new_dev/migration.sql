/*
  Warnings:

  - Added the required column `name` to the `UploadFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UploadLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `uploadfile` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `uploadlink` ADD COLUMN `name` VARCHAR(191) NOT NULL;
