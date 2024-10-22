-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CAISSIER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "pass_word" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CAISSIER',
    "email" VARCHAR(250) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" DECIMAL(15,2) NOT NULL,
    "seuil" INTEGER NOT NULL,
    "category" VARCHAR(250) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code_bare" VARCHAR(100),
    "id_user" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleDetail" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "sale_quantity" INTEGER NOT NULL,
    "id_sale" INTEGER,
    "id_product" INTEGER,

    CONSTRAINT "SaleDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reception" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_supplier" INTEGER,
    "id_user" INTEGER,

    CONSTRAINT "Reception_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "remarque" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER,
    "id_product" INTEGER,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceptionDetail" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "id_reception" INTEGER,
    "id_product" INTEGER,

    CONSTRAINT "ReceptionDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockMouvement" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "id_user" INTEGER,
    "id_product" INTEGER,

    CONSTRAINT "StockMouvement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_code_bare_key" ON "Product"("code_bare");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_id_sale_fkey" FOREIGN KEY ("id_sale") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_id_supplier_fkey" FOREIGN KEY ("id_supplier") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceptionDetail" ADD CONSTRAINT "ReceptionDetail_id_reception_fkey" FOREIGN KEY ("id_reception") REFERENCES "Reception"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceptionDetail" ADD CONSTRAINT "ReceptionDetail_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMouvement" ADD CONSTRAINT "StockMouvement_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMouvement" ADD CONSTRAINT "StockMouvement_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
