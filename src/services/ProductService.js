// import ProductModel from "../models/ProductModel.js"
import prisma from "../config/prisma.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { ProductSerializer } from "../serializers/ProductSerialiser.js";

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
                return ProductSerializer.serializerForTable(products);
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
            const result = await prisma.product.findFirst({ where: { id } })
            return result ? true : false;
        } catch (error) {
            throw error;
        }
    }
    // static async checkProductByUserId(id_user) {
    //     try {
    //         const result = await prisma.product.findFirst({where: {id_user}})
    //         return result.length>0;
    //     } catch (error) {
    //       throw error;
    //     }
    //   }

    // "name": "Product 2",
    // "stock": 25,
    // "sale_price": "150",
    // "purchase_price": "100",
    // "seuil": 30,
    // "code_bare": "FFG3443R4E",
    // "status": false
    static async getProducts() {
        try {
            const products = await prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    stock: true,
                    sale_price: true,
                    purchase_price: true,
                    seuil: true,
                    code_bare: true,
                    status: true,
                    created_at: true,
                    updated_at:true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            })
            return ProductSerializer.serializerForTable(products);
        } catch (error) {
            throw error
        }
    }

    static async createProduct(token, name, stock, sale_price, purchase_price, seuil, code_bare, status) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const id_user = decoded.id;

            const newProduct = await prisma.product.create({
                data: {
                    name: name,
                    stock: stock,
                    sale_price: sale_price,
                    status: status,
                    purchase_price: purchase_price,
                    seuil: seuil,
                    code_bare: code_bare,
                    created_at: new Date(),
                    updated_at: new Date(),
                    id_user: id_user
                }
            });

            return newProduct;
        } catch (error) {
            throw error
        }
    }

    static async updateProduct(token, id, name, sale_price, purchase_price, seuil, code_bare) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const id_user = decoded.id;

            const updatedProduct = await prisma.product.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    sale_price: sale_price,
                    purchase_price: purchase_price,
                    seuil: seuil,
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
            const result = await prisma.product.findFirst({ where: { id } })
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
