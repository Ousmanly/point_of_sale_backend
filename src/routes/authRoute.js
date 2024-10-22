import express from 'express';
import AuthController from '../controllers/AuthController.js';
// import AuthController from '../controllers/authController.js';
const authrouter = express.Router();

// Route de connexion
authrouter.post('/login', AuthController.login);

export default authrouter;
