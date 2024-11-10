import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import stockMouvement from '../controllers/StockMouvementController.js';
import roleAdminMiddleware from '../middlewares/roleAdminMiddlewares.js';

// import SaleController from "../controllers/SaleController.js";
// import { addSaleValidator, deleteSaleValidator } from "../validators/saleValidator.js";
const mouvementRoute = express.Router();

mouvementRoute.get('/mouvements', roleAdminMiddleware, authMiddleware, stockMouvement.getMouvements);

export default mouvementRoute;
