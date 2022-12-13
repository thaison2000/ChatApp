-- CreateTable
CREATE TABLE `UploadFile` (
    `uploadFileId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,

    PRIMARY KEY (`uploadFileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UploadLink` (
    `uploadLinkId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,

    PRIMARY KEY (`uploadLinkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UploadFile` ADD CONSTRAINT `UploadFile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UploadFile` ADD CONSTRAINT `UploadFile_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`groupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UploadLink` ADD CONSTRAINT `UploadLink_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UploadLink` ADD CONSTRAINT `UploadLink_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`groupId`) ON DELETE RESTRICT ON UPDATE CASCADE;
