/*
  Warnings:

  - The primary key for the `friend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `friendRecord_id` on the `friend` table. All the data in the column will be lost.
  - You are about to drop the column `friend_id` on the `friend` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `friend` table. All the data in the column will be lost.
  - The primary key for the `friendrequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `friendRequest_id` on the `friendrequest` table. All the data in the column will be lost.
  - You are about to drop the column `receiveUser_id` on the `friendrequest` table. All the data in the column will be lost.
  - You are about to drop the column `sendUser_id` on the `friendrequest` table. All the data in the column will be lost.
  - The primary key for the `group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `group_id` on the `group` table. All the data in the column will be lost.
  - The primary key for the `groupadmin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `groupAdmin_id` on the `groupadmin` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `groupadmin` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `groupadmin` table. All the data in the column will be lost.
  - The primary key for the `groupuser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `groupUser_id` on the `groupuser` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `groupuser` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `groupuser` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `friendId` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friendRecordId` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friendRequestId` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiveUserId` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sendUserId` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupAdminId` to the `GroupAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `GroupAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GroupAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `GroupUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupUserId` to the `GroupUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GroupUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `friend` DROP FOREIGN KEY `Friend_friend_id_fkey`;

-- DropForeignKey
ALTER TABLE `friend` DROP FOREIGN KEY `Friend_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `friendrequest` DROP FOREIGN KEY `FriendRequest_receiveUser_id_fkey`;

-- DropForeignKey
ALTER TABLE `friendrequest` DROP FOREIGN KEY `FriendRequest_sendUser_id_fkey`;

-- DropForeignKey
ALTER TABLE `groupadmin` DROP FOREIGN KEY `GroupAdmin_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `groupuser` DROP FOREIGN KEY `GroupUser_user_id_fkey`;

-- AlterTable
ALTER TABLE `friend` DROP PRIMARY KEY,
    DROP COLUMN `friendRecord_id`,
    DROP COLUMN `friend_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `friendId` INTEGER NOT NULL,
    ADD COLUMN `friendRecordId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`friendRecordId`);

-- AlterTable
ALTER TABLE `friendrequest` DROP PRIMARY KEY,
    DROP COLUMN `friendRequest_id`,
    DROP COLUMN `receiveUser_id`,
    DROP COLUMN `sendUser_id`,
    ADD COLUMN `friendRequestId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `receiveUserId` INTEGER NOT NULL,
    ADD COLUMN `sendUserId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`friendRequestId`);

-- AlterTable
ALTER TABLE `group` DROP PRIMARY KEY,
    DROP COLUMN `group_id`,
    ADD COLUMN `groupId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`groupId`);

-- AlterTable
ALTER TABLE `groupadmin` DROP PRIMARY KEY,
    DROP COLUMN `groupAdmin_id`,
    DROP COLUMN `group_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `groupAdminId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `groupId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`groupAdminId`);

-- AlterTable
ALTER TABLE `groupuser` DROP PRIMARY KEY,
    DROP COLUMN `groupUser_id`,
    DROP COLUMN `group_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `groupId` INTEGER NOT NULL,
    ADD COLUMN `groupUserId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`groupUserId`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- AddForeignKey
ALTER TABLE `GroupAdmin` ADD CONSTRAINT `GroupAdmin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupUser` ADD CONSTRAINT `GroupUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friend` ADD CONSTRAINT `Friend_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friend` ADD CONSTRAINT `Friend_friendId_fkey` FOREIGN KEY (`friendId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FriendRequest` ADD CONSTRAINT `FriendRequest_sendUserId_fkey` FOREIGN KEY (`sendUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FriendRequest` ADD CONSTRAINT `FriendRequest_receiveUserId_fkey` FOREIGN KEY (`receiveUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
