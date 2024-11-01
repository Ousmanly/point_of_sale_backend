-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_id_product_fkey";

-- DropForeignKey
ALTER TABLE "Reception" DROP CONSTRAINT "Reception_id_supplier_fkey";

-- DropForeignKey
ALTER TABLE "ReceptionDetail" DROP CONSTRAINT "ReceptionDetail_id_product_fkey";

-- DropForeignKey
ALTER TABLE "SaleDetail" DROP CONSTRAINT "SaleDetail_id_product_fkey";

-- DropForeignKey
ALTER TABLE "StockMouvement" DROP CONSTRAINT "StockMouvement_id_product_fkey";

-- DropForeignKey
ALTER TABLE "StockMouvement" DROP CONSTRAINT "StockMouvement_id_user_fkey";

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_id_supplier_fkey" FOREIGN KEY ("id_supplier") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceptionDetail" ADD CONSTRAINT "ReceptionDetail_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMouvement" ADD CONSTRAINT "StockMouvement_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMouvement" ADD CONSTRAINT "StockMouvement_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
