import express from 'express';
import Login from '../api/login.js';
import UserService from '../services/UserService.js';
const authrouter = express.Router();

authrouter.post('/login', Login.login);

//////////////////////////
// authrouter.post("/refresh-token", async (req, res) => {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//         return res.status(400).json({ message: "Refresh token is required" });
//     }

//     try {
//         const { token } = await UserService.refreshAccessToken(refreshToken);
//         res.json({ token });
//     } catch (error) {
//         res.status(401).json({ message: error.message });
//     }
// });

export default authrouter;
