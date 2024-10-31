/*
  Warnings:

  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `purchase_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
DROP COLUMN "price",
ADD COLUMN     "purchase_price" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "sale_price" DECIMAL(15,2) NOT NULL;
