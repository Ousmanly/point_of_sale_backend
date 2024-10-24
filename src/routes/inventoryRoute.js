import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleAdminMiddleware from "../middlewares/roleAdminMiddlewares.js";
import InventoryController from "../controllers/InventoryController.js";
import { addRequestInventoryValidator } from "../validators/inventoryValidator.js";
const inventoryRoute = express.Router()

inventoryRoute.get('/inventories',authMiddleware, InventoryController.getAllInventories)
// productRoute.get('/products', UserController.getAllUsers)
inventoryRoute.post('/inventories', authMiddleware, roleAdminMiddleware, addRequestInventoryValidator, InventoryController.createInventory)
// inventoryRoute.put('/inventories/:id', authMiddleware, roleAdminMiddleware, updateProductValidatore, ProductController.updateProduct)
// inventoryRoute.delete('/inventories/:id', authMiddleware, roleAdminMiddleware, deleteProductValidatore, ProductController.deleteProduct)

export default inventoryRoute