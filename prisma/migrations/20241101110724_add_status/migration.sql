/*
  Warnings:

  - Made the column `status` on table `Supplier` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Supplier" ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "status" SET NOT NULL;
