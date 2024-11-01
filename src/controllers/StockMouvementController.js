import StockMouvementService from "../services/StockMouvementService.js";

import prisma from "../config/prisma.js";
class stockMouvementController {
    static async getMouvements(_req, res){
        try {
            const mouvements = await StockMouvementService.getMouvements()
            res.status(201).json(mouvements)
        } catch (error) {
            throw error
        }
    }
}
export default stockMouvementController