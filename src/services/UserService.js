// import bcrypt from "bcryptjs/dist/bcrypt.js";
import bcrypt from "bcrypt";


import jwt from 'jsonwebtoken';
// import { JWT_SECRET, JWT_EXPIRATION } from '../config/jwt.js';
import { config } from "dotenv"
import prisma from "../config/prisma.js";

config() 
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRATION = process.env.JWT_EXPIRATION
class UserService{
    // static async checkUserEmail(email) {
    //     try {
    //         const result = await prisma.utilisateurs.findFirst({ where: { email } });
    //         return result ? true : false;
    //     } catch (error) {
    //       throw error;
    //     }
    // }

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

    static async getUsers(){
        try {
            const users = await prisma.user.findMany()
            return users;
        } catch (error) {
            throw error
        }
    }
    static async createUser(name, pass_word, role, email ) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(pass_word, salt);
            const newUser = await prisma.user.create({
                data: {
                    name:name,
                    pass_word:hashedPassword,
                    role:role,
                    email:email,
                }
            });
            return newUser;
        } catch (error) {
            throw error
        }
    }

    static async updateUser(id, name, pass_word, role, email) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(pass_word, salt);

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
                pass_word: hashedPassword, 
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

    static async authenticate(email, pass_word){
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await bcrypt.compare(pass_word, user.pass_word);

            if (!isMatch) {
                throw new Error('Incorrect pass word');
            }

            const token = jwt.sign(
                { id: user.id, name: user.name, role: user.role },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRATION }
            );

            return { token, user };
        } catch (error) {
            throw error;
        }
    }
   
}
export default UserService