/*
  Warnings:

  - You are about to drop the `uploadfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `uploadlink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `uploadfile` DROP FOREIGN KEY `UploadFile_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `uploadfile` DROP FOREIGN KEY `UploadFile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `uploadlink` DROP FOREIGN KEY `UploadLink_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `uploadlink` DROP FOREIGN KEY `UploadLink_userId_fkey`;

-- DropTable
DROP TABLE `uploadfile`;

-- DropTable
DROP TABLE `uploadlink`;
