-- DropForeignKey
ALTER TABLE `uploadfile` DROP FOREIGN KEY `UploadFile_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `uploadlink` DROP FOREIGN KEY `UploadLink_groupId_fkey`;

-- AddForeignKey
ALTER TABLE `GroupAdmin` ADD CONSTRAINT `GroupAdmin_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`groupId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupUser` ADD CONSTRAINT `GroupUser_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`groupId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UploadFile` ADD CONSTRAINT `UploadFile_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`groupId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UploadLink` ADD CONSTRAINT `UploadLink_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`groupId`) ON DELETE CASCADE ON UPDATE CASCADE;
