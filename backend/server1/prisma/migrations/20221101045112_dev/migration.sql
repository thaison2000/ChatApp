/*
  Warnings:

  - The primary key for the `friendrequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `FriendRequest` on the `friendrequest` table. All the data in the column will be lost.
  - Added the required column `friendRequest_id` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `friendrequest` DROP PRIMARY KEY,
    DROP COLUMN `FriendRequest`,
    ADD COLUMN `friendRequest_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`friendRequest_id`);
