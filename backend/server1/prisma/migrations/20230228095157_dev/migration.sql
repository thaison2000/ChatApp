/*
  Warnings:

  - Added the required column `companyId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User';

-- CreateTable
CREATE TABLE "Company" (
    "companyId" SERIAL NOT NULL,
    "avatar" TEXT,
    "name" TEXT NOT NULL,
    "desc" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("companyId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE CASCADE ON UPDATE CASCADE;
