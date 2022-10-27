-- CreateTable
CREATE TABLE `Group` (
    `group_id` INTEGER NOT NULL AUTO_INCREMENT,
    `avatar` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupAdmin` (
    `groupAdmin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`groupAdmin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupUser` (
    `groupUser_id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`groupUser_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
