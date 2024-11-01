import prisma from "../config/prisma.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { SupplierSerializer } from "../serializers/SupplierSerialiser.js";

config();

const JWT_SECRET = process.env.JWT_SECRET;

class SupplierService {

    static async checkSupplierById(id) {
        try {
          const result = await prisma.supplier.findFirst({where: {id}})
          return result ? true : false;
        } catch (error) {
          throw error;
        }
    }

    static async checkSupplier(phone, id = null) {
        try {
            phone = phone.toString()
            if (id) {
                const suppliers = await prisma.supplier.findMany({
                    where: {
                        phone: phone,
                        id: {
                            not: id,
                        },
                    },
                    select: {
                        id: true,
                        phone: true,
                    },
                });
                return suppliers;
            } else {
                const result = await prisma.supplier.findFirst({ where: { phone } });
                return result ? true : false;
            }
        } catch (error) {
            throw error;
        }
    }
    static async getSupplierById(id) {
        try {
          const result = await prisma.supplier.findFirst({where: {id}})
          return result
        } catch (error) {
          throw error;
        }
    }

    static async getSuppliers(){
        try {
            const suppliers = await prisma.supplier.findMany({
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            })
            return SupplierSerializer.serializerForTable(suppliers);
        } catch (error) {
            throw error
        }
    }
    // static async checkSupplierByUserId(id_user) {
    //     try {
    //         const result = await prisma.supplier.findFirst({where: {id_user}})
    //         return result.length>0;
    //     } catch (error) {
    //       throw error;
    //     }
    //   }

    static async createSupplier(token, name, phone) {
    // static async createSupplier(name) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const id_user = decoded.id; 
            
            const newSupplier = await prisma.supplier.create({
                data: {
                    name: name,
                    phone:phone,
                    id_user: id_user 
                }
            });

            return newSupplier;
        } catch (error) {
            throw error
        }
    }

    static async updateSupplier(token, id, name, phone) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const id_user = decoded.id; 
            
            const updateSupplier = await prisma.supplier.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    phone: phone,
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
