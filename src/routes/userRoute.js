import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import UserController from "../controllers/userController.js";
import { addRequestUserValidator, updateUserValidatore } from "../validators/userValidator.js";

const userRoute = express.Router()

userRoute.get('/users',authMiddleware, UserController.getAllUsers)
// userRoute.get('/users', UserController.getAllUsers)
userRoute.post('/users', authMiddleware, addRequestUserValidator, UserController.createUser)
userRoute.put('/users/:id', authMiddleware, updateUserValidatore, UserController.updateUser)
userRoute.delete('/users/:id', authMiddleware, UserController.deleteUser)

export default userRoute