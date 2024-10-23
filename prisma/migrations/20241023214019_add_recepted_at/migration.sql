/*
  Warnings:

  - You are about to drop the column `reception_at` on the `Reception` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reception" DROP COLUMN "reception_at",
ADD COLUMN     "recepted_at" TIMESTAMP(3);
