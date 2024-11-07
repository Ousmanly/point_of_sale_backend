import prisma from '../config/prisma.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { InventorySerializer } from '../serializers/inventorySerialiser.js';

config();

const JWT_SECRET = process.env.JWT_SECRET;

class InventoryService {
  static async getInventory() {
    try {
      const inventaries = await prisma.inventory.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return InventorySerializer.serializerForTable(inventaries);
    } catch (error) {
      throw error;
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
            created_at: new Date(),
          },
        });

        await prisma.product.update({
          where: { id: id_product },
          data: {
            stock: {
              set: quantity,
            },
          },
        });

        await prisma.stockMouvement.create({
          data: {
            quantity: quantity,
            id_product: id_product,
            id_user: userId,
            movement_at: new Date(),
          },
        });

        return newInventory;
      } catch (error) {
        throw error;
      }
    });
  }
}

export default InventoryService;
