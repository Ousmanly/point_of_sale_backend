import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import ProductController from "../controllers/ProductController.js";
import { addRequestProductValidator, deleteProductValidatore, updateProductValidatore } from "../validators/productValidator.js";
import roleAdminMiddleware from "../middlewares/roleAdminMiddlewares.js";
const productRoute = express.Router()

productRoute.get('/products',authMiddleware, ProductController.getAllProducts)
// productRoute.get('/products', UserController.getAllUsers)
productRoute.post('/products', authMiddleware, roleAdminMiddleware, addRequestProductValidator, ProductController.createProduct)
productRoute.put('/products/:id', authMiddleware, roleAdminMiddleware, updateProductValidatore, ProductController.updateProduct)
productRoute.delete('/products/:id', authMiddleware, roleAdminMiddleware, deleteProductValidatore, ProductController.deleteProduct)
productRoute.put('/products/:id/status', ProductController.updateProductStatus);

export default productRoute 