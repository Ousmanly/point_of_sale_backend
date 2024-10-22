import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import ProductController from "../controllers/ProductController.js";
import { addRequestProductValidator, deleteProductValidatore, updateProductValidatore } from "../validators/productValidator.js";
const productRoute = express.Router()

productRoute.get('/products',authMiddleware, ProductController.getAllProducts)
// productRoute.get('/products', UserController.getAllUsers)
productRoute.post('/products', authMiddleware, addRequestProductValidator, ProductController.createProduct)
productRoute.put('/products/:id', authMiddleware, updateProductValidatore, ProductController.updateProduct)
productRoute.delete('/products/:id', authMiddleware, deleteProductValidatore, ProductController.deleteProduct)

export default productRoute