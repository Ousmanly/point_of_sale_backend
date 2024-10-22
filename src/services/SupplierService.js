import prisma from "../config/prisma.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const JWT_SECRET = process.env.JWT_SECRET;

class SupplierService {

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

    static async checkSupplierById(id) {
        try {
          const result = await prisma.supplier.findFirst({where: {id}})
          return result ? true : false;
        } catch (error) {
          throw error;
        }
    }

    static async getSuppliers(){
        try {
            const suppliers = await prisma.supplier.findMany()
            return suppliers;
        } catch (error) {
            throw error
        }
    }

    static async createSupplier(token, name) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const id_user = decoded.id; 
            
            const newSupplier = await prisma.supplier.create({
                data: {
                    name: name,
                    id_user: id_user 
                }
            });

            return newSupplier;
        } catch (error) {
            throw error
        }
    }

    static async updateSupplier(token, id, name) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const id_user = decoded.id; 
            
            const updateSupplier = await prisma.supplier.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    id_user: id_user
                }
            });

            return updateSupplier;
        } catch (error) {
            throw error
        }
    }
    static async deleteSupplier(id) {
        try {
            const suppliers = await prisma.supplier.delete({
                where: { id: id },
            });
            return suppliers;
        } catch (error) {
            throw error;
        }
    }
}

export default SupplierService;
