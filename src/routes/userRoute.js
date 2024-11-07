import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import UserController from '../controllers/userController.js';
import {
  addRequestUserValidator,
  deleteUserValidatore,
  updateUserValidatore,
} from '../validators/userValidator.js';
import roleAdminMiddleware from '../middlewares/roleAdminMiddlewares.js';

const userRoute = express.Router();

userRoute.get(
  '/users',
  authMiddleware,
  roleAdminMiddleware,
  UserController.getAllUsers
);
// userRoute.get('/users', UserController.getAllUsers)
userRoute.post(
  '/users',
  authMiddleware,
  roleAdminMiddleware,
  addRequestUserValidator,
  UserController.createUser
);
userRoute.put(
  '/users/:id',
  authMiddleware,
  roleAdminMiddleware,
  updateUserValidatore,
  UserController.updateUser
);
userRoute.delete(
  '/users/:id',
  authMiddleware,
  roleAdminMiddleware,
  deleteUserValidatore,
  UserController.deleteUser
);
userRoute.get('/user', authMiddleware, UserController.getCurrentUser);
userRoute.put('/users/:id/status', UserController.updateUserStatus);

userRoute.post('/request-password-reset', UserController.requestPasswordReset);
userRoute.post('/reset-password', UserController.resetPassword);

export default userRoute;
