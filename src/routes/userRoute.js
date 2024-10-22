import express from "express";
// import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import UserController from "../controllers/userController.js";

const userRoute = express.Router()

userRoute.get('/users',authMiddleware, UserController.getAllUsers)
// userRoute.get('/users', UserController.getAllUsers)
userRoute.post('/users', authMiddleware, UserController.createUser)
userRoute.put('/users/:id', authMiddleware, UserController.updateUser)
userRoute.delete('/users/:id', authMiddleware, UserController.deleteUser)

export default userRoute