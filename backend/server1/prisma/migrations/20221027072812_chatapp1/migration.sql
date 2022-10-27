/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `GroupAdmin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `GroupUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `GroupAdmin_user_id_key` ON `GroupAdmin`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `GroupUser_user_id_key` ON `GroupUser`(`user_id`);
