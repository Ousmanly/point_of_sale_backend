import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import UserController from "../controllers/userController.js";
import { addRequestUserValidator, deleteUserValidatore, updateUserValidatore } from "../validators/userValidator.js";
import roleAdminMiddleware from "../middlewares/roleAdminMiddlewares.js";

const userRoute = express.Router()

userRoute.get('/users',authMiddleware, UserController.getAllUsers)
// userRoute.get('/users', UserController.getAllUsers)
userRoute.post('/users', authMiddleware, roleAdminMiddleware, addRequestUserValidator, UserController.createUser)
userRoute.put('/users/:id', authMiddleware, roleAdminMiddleware, updateUserValidatore, UserController.updateUser)
userRoute.delete('/users/:id', authMiddleware, roleAdminMiddleware, deleteUserValidatore, UserController.deleteUser)
userRoute.get('/user', authMiddleware, UserController.getCurrentUser);

export default userRoute