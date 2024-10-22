import express from 'express';
import Login from '../api/login.js';
const authrouter = express.Router();

authrouter.post('/login', Login.login);

export default authrouter;
