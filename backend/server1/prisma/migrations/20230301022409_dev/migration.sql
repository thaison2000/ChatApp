-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Locked', 'Unlocked');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Unlocked';
