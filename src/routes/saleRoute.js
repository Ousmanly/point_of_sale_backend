import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import SaleController from "../controllers/SaleController.js";
import { addSaleValidator, deleteSaleValidator } from "../validators/saleValidator.js";
const saleRoute = express.Router()

saleRoute.get('/sales',authMiddleware, SaleController.getAllSales)
saleRoute.post('/sales', authMiddleware, addSaleValidator, SaleController.createSale)
saleRoute.delete('/sales/:id', authMiddleware,deleteSaleValidator, SaleController.deleteSale)

export default saleRoute