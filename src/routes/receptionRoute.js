import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import ReceptionController from "../controllers/ReceptionController.js";
import { addRequestReceptionValidator, deleteReceptionValidatore } from "../validators/receptionValidator.js";
const receptionRoute = express.Router()

receptionRoute.get('/receptions',authMiddleware, ReceptionController.getAllReceptions)
receptionRoute.post('/receptions', authMiddleware, addRequestReceptionValidator, ReceptionController.createReception)
receptionRoute.delete('/receptions/:id', authMiddleware,deleteReceptionValidatore, ReceptionController.deleteReception)

export default receptionRoute