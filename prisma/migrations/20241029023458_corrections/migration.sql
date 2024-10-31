/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "email" VARCHAR(250) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "phone" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sale_email_key" ON "Sale"("email");
