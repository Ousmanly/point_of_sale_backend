import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import prisma from '../config/prisma.js';
import transporter from '../config/transporter.js';
config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
const EMAIL_USER = process.env.EMAIL_USER;
//////////
// const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret_key';
// const REFRESH_EXPIRATION = process.env.REFRESH_EXPIRATION || '7d';
class UserService {
  static async checkUser(email, id = null) {
    try {
      if (id) {
        const users = await prisma.user.findMany({
          where: {
            email: email,
            id: {
              not: id,
            },
          },
          select: {
            id: true,
            email: true,
          },
        });
        return users;
      } else {
        const result = await prisma.user.findFirst({ where: { email } });
        return result ? true : false;
      }
    } catch (error) {
      throw error;
    }
  }

  ///
  static async checkUserById(id) {
    try {
      const result = await prisma.user.findFirst({ where: { id } });
      return result ? true : false;
    } catch (error) {
      throw error;
    }
  }
  static async checkSupplierByUserId(userId) {
    try {
      const supplier = await prisma.supplier.findFirst({
        where: { id_user: userId },
      });
      return !!supplier;
    } catch (error) {
      throw new Error('Error checking supplier by user ID');
    }
  }

  static async checkProductByUserId(userId) {
    try {
      const product = await prisma.product.findFirst({
        where: { id_user: userId },
      });
      return !!product;
    } catch (error) {
      throw new Error('Error checking product by user ID');
    }
  }
  static async checkReceptionByUserId(userId) {
    try {
      const reception = await prisma.reception.findFirst({
        where: { id_user: userId },
      });
      return !!reception;
    } catch (error) {
      throw new Error('Error checking reception by user ID');
    }
  }
  static async checkMouvementByUserId(userId) {
    try {
      const mouvement = await prisma.stockMouvement.findFirst({
        where: { id_user: userId },
      });
      return !!mouvement;
    } catch (error) {
      throw new Error('Error checking mouvement by user ID');
    }
  }

  // static async checkRecipeById(id) {
  //     try {
  //       const results = await prisma.recipe.findMany({
  //         where: {
  //           category_id: id,
  //         },
  //       });
  //       return results.length > 0;
  //     } catch (error) {
  //       throw new Error(`Error checking recipe by ID: ${error.message}`);
  //     }
  //   }
  static async getUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async createUser(name, password, role, email, status) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await prisma.user.create({
        data: {
          name: name,
          password: hashedPassword,
          role: role,
          email: email,
          status: status,
        },
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, name, role, email) {
    try {
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);

      let user = null;
      const check = await prisma.user.findFirst({ where: { id } });

      if (!check) {
        throw new Error("user with this ID doesn't exist.");
      }
      user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          // password: hashedPassword,
          role: role,
          email: email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const user = await prisma.user.delete({
        where: { id: id },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async authenticate(email, password) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (!user.status) {
        throw new Error('Account is inactive');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error('Incorrect pass word');
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION || '5h' }
      );
      // const token = jwt.sign(
      //     { id: user.id, name: user.name, role: user.role },
      //     JWT_SECRET,
      //     { expiresIn: JWT_EXPIRATION }
      // );

      // const refreshToken = jwt.sign(
      //     { id: user.id },
      //     REFRESH_SECRET,
      //     { expiresIn: REFRESH_EXPIRATION }
      // );

      // Stocker le refresh token dans la base de données
      // await prisma.user.update({
      //     where: { id: user.id },
      //     data: { refreshToken }
      // });

      // return { token };
      return { token, user: { id: user.id, name: user.name, role: user.role } };
      // return { token, refreshToken, user: { id: user.id, name: user.name, role: user.role } };
    } catch (error) {
      throw error;
    }
  }
  // static async refreshAccessToken(refreshToken) {
  //     try {
  //         // Vérifier le token de rafraîchissement
  //         const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
  //         const user = await prisma.user.findUnique({
  //             where: { id: decoded.id },
  //         });

  //         if (!user || user.refreshToken !== refreshToken) {
  //             throw new Error("Invalid refresh token");
  //         }

  //         // Générer un nouveau token d'accès
  //         const token = jwt.sign(
  //             { id: user.id, name: user.name, role: user.role },
  //             JWT_SECRET,
  //             { expiresIn: JWT_EXPIRATION }
  //         );

  //         return { token };
  //     } catch (error) {
  //         throw new Error("Refresh token expired or invalid");
  //     }
  // }

  // static async sendPasswordResetEmail(email) {
  //     const user = await prisma.user.findUnique({ where: { email } });
  //     if (!user) {
  //         throw new Error('User not found');
  //     }

  //     const token = jwt.sign({ id: user.id }, JWT_SECRET, JWT_EXPIRATION);
  //     const resetUrl = `http://localhost:5174/reset-password?token=${token}`;
  //     const mailOptions = {
  //         from: EMAIL_USER,
  //         to: email,
  //         subject: 'Réinitialisation de votre mot de passe',
  //         text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetUrl}`,
  //     };

  //     await transporter.sendMail(mailOptions);
  //     return { message: 'Email de réinitialisation envoyé.' };
  // }
  static async sendPasswordResetEmail(email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
    const resetUrl = `http://localhost:5174/reset-password?token=${token}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);
    return { message: 'Email de réinitialisation envoyé.' };
  }
  static async resetPassword(token, newPassword) {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Mot de passe réinitialisé avec succès.' };
  }
}
export default UserService;
