-- AlterTable
ALTER TABLE `group` MODIFY `avatar` VARCHAR(191) NULL,
    MODIFY `desc` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `address` VARCHAR(191) NULL,
    MODIFY `dateOfBirth` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `avatar` VARCHAR(191) NULL;
