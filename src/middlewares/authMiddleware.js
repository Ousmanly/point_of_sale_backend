import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acces denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // if (decoded.role !== 'ADMIN') {
    //     return res.status(403).json({ message: 'Acces denied. You are not authorized.' });
    // }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalide token.' });
  }
};

export default authMiddleware;
