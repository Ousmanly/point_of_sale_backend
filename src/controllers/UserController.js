import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';

import UserService from '../services/UserService.js';

class UserController {
  static async getAllUsers(_req, res) {
    const result = await UserService.getUsers();
    res.status(201).json(result);
  }

  static async createUser(req, res, next) {
    const { name, password, role, email, status } = req.body;
    try {
      await UserService.createUser(name, password, role, email, status);
      res.status(201).json({ message: req.t('message.createUser') });
    } catch (error) {
      throw error;
    }
    next();
  }

  static async updateUser(req, res, next) {
    const id = Number(req.params.id);
    if (id) {
      const { name, role, email } = req.body;
      try {
        await UserService.updateUser(id, name, role, email);
        res.status(201).json({ message: req.t('message.updateUser') });
      } catch (error) {
        throw error;
      }
    }
    next();
  }

  static async updateUserStatus(req, res) {
    const userId = parseInt(req.params.id, 10); 
    const { status } = req.body; 

    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { status: status },
      });
      res
        .status(200)
        .json({ message: 'User status updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user status', error });
    }
  }
  static async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      await UserService.deleteUser(parseInt(id));
      res.status(200).json({ message: req.t('message.deleteUser') });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    next();
  }

  static async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user) {
        res.json({ user });
      } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  static async requestPasswordReset(req, res) {
    const { email } = req.body;
    try {
      const response = await UserService.sendPasswordResetEmail(email);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async resetPassword(req, res) {
    const { token, newPassword } = req.body;
    try {
      const response = await UserService.resetPassword(token, newPassword);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateCurrentUser(req, res, next) {
    const userId = req.user.id;
    const { name, email } = req.body; 
    try {
      const user = await UserService.updateCurrentUser(userId, { name, email });
      res.status(200).json({ message: 'Informations mises à jour avec succès', user });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour des informations', error: error.message });
    }
    next();
  }
  
  static async changePassword(req, res) {
    const userId = req.user.id; // ID de l'utilisateur, généralement passé par le middleware d'authentification
    const { currentPassword, newPassword } = req.body; // Mot de passe actuel et nouveau mot de passe
  
    try {
      // Trouver l'utilisateur dans la base de données
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Comparer le mot de passe actuel avec celui en base de données
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect." });
      }
  
      // Hasher le nouveau mot de passe
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Mettre à jour le mot de passe dans la base de données
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });
  
      res.status(200).json({
        message: "Password updated successfully.",
        // user: {
        //   id: updatedUser.id,
        //   name: updatedUser.name,
        //   email: updatedUser.email,
        // },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error changing password." });
    }
  };
}

export default UserController;
