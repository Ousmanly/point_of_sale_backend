// import ProductModel from "../models/ProductModel.js"
import prisma from "../config/prisma.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const JWT_SECRET = process.env.JWT_SECRET;
class ProductService {
    
    static async checkProduct(code_bare, id = null) {
        try {
            if (id) {
                const products = await prisma.product.findMany({
                    where: {
                        code_bare: code_bare,
                        id: {
                            not: id,
                        },
                    },
                    select: {
                        id: true,
                        code_bare: true,
                    },
                });
                return products;
            } else {
                const result = await prisma.product.findFirst({ where: { code_bare } });
                return result ? true : false;
            }
        } catch (error) {
            throw error;
        }
    }

    static async checkProductById(id) {
        try {
          const result = await prisma.product.findFirst({where: {id}})
          return result ? true : false;
        } catch (error) {
          throw error;
        }
    }

    static async getProducts(){
        try {
            const products = await prisma.product.findMany()
            return products;
        } catch (error) {
            throw error
        }
    }

    static async createProduct(token, name, stock, price, seuil, category, code_bare) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const id_user = decoded.id; 
            
            const newProduct = await prisma.product.create({
                data: {
                    name: name,
                    stock: stock,
                    price: price,
                    seuil: seuil,
                    category: category,
                    code_bare: code_bare,
                    created_at: new Date(),
                    id_user: id_user 
                }
            });

            return newProduct;
        } catch (error) {
            throw error
        }
    }

    static async updateProduct(token, id, name, price, seuil, category, code_bare) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const id_user = decoded.id; 
            
            const updatedProduct = await prisma.product.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    price: price,
                    seuil: seuil,
                    category: category,
                    code_bare: code_bare,
                    updated_at: new Date(),
                    id_user: id_user
                }
            });

            return updatedProduct;
        } catch (error) {
            throw error
        }
    }
    static async getProductById(id) {
        try {
          const result = await prisma.product.findFirst({where: {id}})
          return result
        } catch (error) {
          throw error;
        }
    }
    static async deleteProduct(id) {
        try {
            const products = await prisma.product.delete({
                where: { id: id },
            });
            return products;
        } catch (error) {
            throw error;
        }
    }
}   

export default ProductService;
