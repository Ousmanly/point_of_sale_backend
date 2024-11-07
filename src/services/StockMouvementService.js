import prisma from '../config/prisma.js';
import { MouvementSerializer } from '../serializers/MouvementSerialiser.js';

class StockMouvenmentService {
  static async getMouvements() {
    try {
      const mouvements = await prisma.stockMouvement.findMany({
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
      return MouvementSerializer.serializerForTable(mouvements);
    } catch (error) {
      throw error;
    }
  }
}
export default StockMouvenmentService;
