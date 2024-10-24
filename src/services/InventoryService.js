import prisma from "../config/prisma.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const JWT_SECRET = process.env.JWT_SECRET;

class InventoryService {

    // static async checkProduct(code_bare, id = null) {
    //     try {
    //         if (id) {
    //             const products = await prisma.product.findMany({
    //                 where: {
    //                     code_bare: code_bare,
    //                     id: {
    //                         not: id,
    //                     },
    //                 },
    //                 select: {
    //                     id: true,
    //                     code_bare: true,
    //                 },
    //             });
    //             return products;
    //         } else {
    //             const result = await prisma.product.findFirst({ where: { code_bare } });
    //             return result ? true : false;
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // static async checkSupplierById(id) {
    //     try {
    //       const result = await prisma.supplier.findFirst({where: {id}})
    //       return result ? true : false;
    //     } catch (error) {
    //       throw error;
    //     }
    // }

    static async getInventory(){
        try {
            const inventaries = await prisma.inventory.findMany()
            return inventaries;
        } catch (error) {
            throw error
        }
    }
    static async addInventory(token, id_product, quantity, remarque) {
        return await prisma.$transaction(async (prisma) => {
          try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const userId = decoded.id;
            
            const newInventory = await prisma.inventory.create({
              data: {
                id_product: id_product,
                quantity: quantity,
                remarque: remarque,
                id_user: userId,
                created_at: new Date()
              }
            });
    
            await prisma.product.update({
              where: { id: id_product },
              data: {
                stock: {
                  set: quantity
                }
              }
            });
    
            await prisma.stockMouvement.create({
              data: {
                quantity: quantity,
                id_product: id_product,
                id_user: userId,
                movement_at: new Date()
              }
            });
    
            return newInventory;
          } catch (error) {
            throw error;
          }
        });
      }
    
}

export default InventoryService;
