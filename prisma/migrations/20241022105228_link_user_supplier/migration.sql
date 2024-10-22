-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "id_user" INTEGER;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
