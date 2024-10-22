import prisma from "../config/prisma.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

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

    static async getReceptions(){
        try {
          const receptions = await prisma.reception.findMany({
            include: {
                ReceptionDetail: true
            }
          });
      
          return receptions
        } catch (error) {
            throw error
        }
    };
      

  static async addReception(token, supplierId, receptionDetails) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.id; 

      const newReception = await prisma.reception.create({
        data: {
          id_supplier: supplierId,
          id_user: userId,
          created_at: new Date(),
          ReceptionDetail: {
            create: receptionDetails.map(detail => ({
              quantity: detail.quantity,
              id_product: detail.id_product
            }))
          }
        },
        include: {
          ReceptionDetail: true
        }
      });

      for (const detail of newReception.ReceptionDetail) {
        const product = await prisma.product.update({
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
  }


  static async deleteReception(receptionId){
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
  
        await prisma.stockMouvement.deleteMany({
          where: {
            id_product: detail.id_product,
            quantity: detail.quantity
          }
        });
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
  
      return deletedReception
    } catch (error) {
        throw error
    }
  };
  
}

export default ReceptionService;
