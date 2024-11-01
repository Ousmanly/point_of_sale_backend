import bcrypt from "bcrypt";


import jwt from 'jsonwebtoken';
import { config } from "dotenv"
import prisma from "../config/prisma.js";

config() 
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRATION = process.env.JWT_EXPIRATION
class UserService{


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
          const result = await prisma.user.findFirst({where: {id}})
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
        throw new Error("Error checking supplier by user ID");
        }
    }
 
    static async checkProductByUserId(userId) {
        try {
        const product = await prisma.product.findFirst({
            where: { id_user: userId }, 
        });
        return !!product; 
        } catch (error) {
        throw new Error("Error checking product by user ID");
        }
    }
    static async checkReceptionByUserId(userId) {
        try {
        const reception = await prisma.reception.findFirst({
            where: { id_user: userId }, 
        });
        return !!reception; 
        } catch (error) {
        throw new Error("Error checking reception by user ID");
        }
    }
    static async checkMouvementByUserId(userId) {
        try {
        const mouvement = await prisma.stockMouvement.findFirst({
            where: { id_user: userId }, 
        });
        return !!mouvement; 
        } catch (error) {
        throw new Error("Error checking mouvement by user ID");
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
    static async getUsers(){
        try {
            const users = await prisma.user.findMany()
            return users;
        } catch (error) {
            throw error
        }
    }
    static async createUser(name, password, role, email ) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await prisma.user.create({
                data: {
                    name:name,
                    password:hashedPassword,
                    role:role,
                    email:email,
                }
            });
            return newUser;
        } catch (error) {
            throw error
        }
    }

    static async updateUser(id, name, role, email) {
        try {
            // const salt = await bcrypt.genSalt(10);
            // const hashedPassword = await bcrypt.hash(password, salt);

            let user = null
            const check = await prisma.user.findFirst({where: {id}})

            if(!check){
                throw new Error('user with this ID doesn\'t exist.');
            }
            user = await prisma.user.update({where: {
                id: id,
            }, 
            data:{
                name: name, 
                // password: hashedPassword, 
                role: role, 
                email: email
            }})
            return user
    
            } catch (error) {
                throw error
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

    static async authenticate(email, password){
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error('Incorrect pass word');
            }

            const token = jwt.sign(
                { id: user.id, name: user.name, role: user.role },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRATION }
            );

            // return { token };
            return { token, user: { id: user.id, name: user.name, role: user.role } };
        } catch (error) {
            throw error;
        }
    }
   
}
export default UserService