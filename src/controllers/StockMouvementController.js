// import MouvementService from "../services/MouvementService.js";

import prisma from "../config/prisma.js";

class stockMouvementController {
    static async getMouvements(_req, res){
        try {
            const mouvements = await prisma.stockMouvement.findMany() ;
            res.status(201).json(mouvements)
        } catch (error) {
            throw error
        }
    }
}
export default stockMouvementController