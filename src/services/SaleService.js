import Decimal from 'decimal.js';
import prisma from "../config/prisma.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const JWT_SECRET = process.env.JWT_SECRET;

class SaleService {

  static async checkSaleById(id) {
    try {
      const result = await prisma.sale.findFirst({where: {id}})
      return result ? true : false;
    } catch (error) {
      throw error;
    }
  }


  static async getSales(){
    try {
      const sales = await prisma.sale.findMany({
        include: {
          SaleDetail: true
        }
      });
  
      return sales
    } catch (error) {
        throw error
    }
  };

  static async createSale(token, saleDetails, sale_at) {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id; 
    return await prisma.$transaction(async (prisma) => {

      for (const detail of saleDetails) {
        const product = await prisma.product.findUnique({
          where: { id: detail.id_product },
        });

        if (!product || product.stock < detail.sale_quantity) {
          const error = new Error(`Not enough stock for product ID ${detail.id_product}`);
          error.statusCode = 400; 
          throw error;
        }

       
        const price = detail.price !== undefined && detail.price !== null ? new Decimal(detail.price) : new Decimal(product.price);

       
        const amount = price.times(detail.sale_quantity);

        detail.amount = amount.toFixed(2);
        detail.price = price.toFixed(2);   
      }

      const sale = await prisma.sale.create({
        data: {
          id_user: userId,
          sale_at:sale_at,
          SaleDetail: {
            create: saleDetails.map(detail => ({
              id_product: detail.id_product,
              sale_quantity: detail.sale_quantity,
              amount: detail.amount,
              price: detail.price,
            })),
          },
        },
      });

      for (const detail of saleDetails) {
        await prisma.product.update({
          where: { id: detail.id_product },
          data: {
            stock: {
              decrement: detail.sale_quantity,
            },
          },
        });

        await prisma.stockMouvement.create({
          data: {
            id_user: userId,
            id_product: detail.id_product,
            quantity: -detail.sale_quantity,
          },
        });
      }

      return sale;
    });

    
  }

  static async deleteSale(saleId) {
    const transaction = await prisma.$transaction(async (prisma) => {
      try {
        const saleDetails = await prisma.saleDetail.findMany({
          where: { 
            id_sale: saleId 
          }
        });
  
        for (const detail of saleDetails) {

          await prisma.product.update({
            where: { 
              id: detail.id_product 
            },
            data: { 
              stock: { 
                increment: detail.sale_quantity 
              } } 
          });
  
          const movement = await prisma.stockMouvement.findFirst({
            where: {
              id_product: detail.id_product,
              quantity: -detail.sale_quantity
            }
          });
  
          if (movement) {
            await prisma.stockMouvement.delete({
              where: { 
                id: movement.id 
              } 
            });
          }
        }
  
        await prisma.saleDetail.deleteMany({
          where: { 
            id_sale: saleId 
          }
        });
  
        const deletedSale = await prisma.sale.delete({
          where: { 
            id: saleId 
          }
        });
  
        return deletedSale;
      } catch (error) {
        throw error;
      }
    });
  
    return transaction;
  }
  
  

}

export default SaleService;