import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import SupplierController from "../controllers/SupplierController.js";
import { addRequestSupplierValidator, deleteSupplierValidatore, updateSupplierValidatore } from "../validators/supplierValidator.js";
import roleAdminMiddleware from "../middlewares/roleAdminMiddlewares.js";
const supplierRoute = express.Router()

supplierRoute.get('/suppliers',roleAdminMiddleware,authMiddleware, SupplierController.getAllSuppliers)
// supplierRoute.get('/products', UserController.getAllUsers)
supplierRoute.post('/suppliers', roleAdminMiddleware, authMiddleware, addRequestSupplierValidator, SupplierController.createSupplier)
supplierRoute.put('/suppliers/:id', authMiddleware, roleAdminMiddleware, updateSupplierValidatore, SupplierController.updateSupplier)
supplierRoute.delete('/suppliers/:id', authMiddleware,roleAdminMiddleware, deleteSupplierValidatore, SupplierController.deleteSupplier)
supplierRoute.put('/suppliers/:id/status', SupplierController.updateSupplierStatus);

// supplierRoute.get('/suppliers', SupplierController.getAllSuppliers)
// // supplierRoute.get('/products', UserController.getAllUsers)
// supplierRoute.post('/suppliers', addRequestSupplierValidator, SupplierController.createSupplier)
// supplierRoute.put('/suppliers/:id', updateSupplierValidatore, SupplierController.updateSupplier)
// supplierRoute.delete('/suppliers/:id', deleteSupplierValidatore, SupplierController.deleteSupplier)

export default supplierRoute