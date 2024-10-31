/*
  Warnings:

  - Added the required column `price` to the `ReceptionDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReceptionDetail" ADD COLUMN     "price" DECIMAL(15,2) NOT NULL;
