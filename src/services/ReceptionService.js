import prisma from "../config/prisma.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { ReceptionSerializer } from "../serializers/RecepionSerialiser.js";

config();

const JWT_SECRET = process.env.JWT_SECRET;

class ReceptionService {

    static async checkReceptionById(id) {
        try {
          const result = await prisma.reception.findFirst({where: {id}})
          return result ? true : false;
        } catch (error) {
          throw error;
        }
    }

    // static async getReceptions(){
    //     try {
    //       const receptions = await prisma.reception.findMany({
    //         include: {
    //             supplier:{
    //                 select:{
    //                     name:true,
    //                     phone:true
    //                 }
    //             },
    //             user:{
    //                 select:{
    //                     name:true
    //                 }
    //             },
    //             ReceptionDetail:{
    //                 select: {
    //                     quantity: true,
    //                     id_product:true
    //                 }
    //             }
    //         }
    //       });
    //       return ReceptionSerializer.serializerForTable(receptions)
    //     } catch (error) {
    //         throw error
    //     }
    // };
    static async getReceptions() {
        try {
            const receptions = await prisma.reception.findMany({
                include: {
                    supplier: {
                        select: {
                            id: true,
                            name: true,
                            phone: true
                        }
                    },
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    ReceptionDetail: {
                        select: {
                            quantity: true,
                            price: true,
                            product: {  // Inclut le produit lié pour obtenir son nom
                                select: {
                                    name: true // Sélectionne le nom du produit
                                }
                            }
                        }
                    }
                }
            });
            return ReceptionSerializer.serializerForTable(receptions);
        } catch (error) {
            throw error;
        }
    }
      
static async addReception(token, id_supplier, recepted_at, receptionDetails) {
    return await prisma.$transaction(async (prisma) => {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id; 
  
        const newReception = await prisma.reception.create({
          data: {
            id_supplier: id_supplier,
            id_user: userId,
            created_at: new Date(),
            recepted_at: new Date(recepted_at).toISOString(),
            ReceptionDetail: {
              create: receptionDetails.map(detail => ({
                quantity: detail.quantity,
                price: detail.price,
                id_product: detail.id_product
              }))
            }
          },
          include: {
            ReceptionDetail: true
          }
        });
  
        for (const detail of newReception.ReceptionDetail) {
          await prisma.product.update({
            where: { id: detail.id_product },
            data: {
              stock: {
                increment: detail.quantity
              }
            }
          });
  
          await prisma.stockMouvement.create({
            data: {
              quantity: detail.quantity,
              id_product: detail.id_product,
              id_user: userId,
              movement_at: new Date()
            }
          });
        }
  
        return newReception;
      } catch (error) {
        throw error;
      }
    });
  }
  

static async deleteReception(receptionId) {

    return await prisma.$transaction(async (prisma) => {
      try {
        const receptionDetails = await prisma.receptionDetail.findMany({
          where: {
            id_reception: receptionId
          }
        });
  
        for (const detail of receptionDetails) {
          await prisma.product.update({
            where: {
              id: detail.id_product
            },
            data: {
              stock: {
                decrement: detail.quantity
              }
            }
          });
  
          const stockMovement = await prisma.stockMouvement.findFirst({
            where: {
              id_product: detail.id_product,
              quantity: detail.quantity
            }
          });
  
          if (stockMovement) {
            await prisma.stockMouvement.delete({
              where: {
                id: stockMovement.id
              }
            });
          }
        }
  
        await prisma.receptionDetail.deleteMany({
          where: {
            id_reception: receptionId
          }
        });
  
        const deletedReception = await prisma.reception.delete({
          where: {
            id: receptionId
          }
        });
  
        return deletedReception;
      } catch (error) {
        throw error;
      }
    });
  }
  
  
}

export default ReceptionService;
