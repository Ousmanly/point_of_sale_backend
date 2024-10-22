// import UserService from "../services/UserService.js";

import ProductService from "../services/ProductService.js";

class ProductController{
    static async getAllProducts(_req, res){
        const result = await ProductService.getProducts()
        res.status(201).json(result)
    }

    static async createProduct(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const { name, stock, price, seuil, category, code_bare } = req.body;
        try {
            await ProductService.createProduct(token, name, stock, price, seuil, category, code_bare);
            res.status(201).json({message:"product has been created"});
        } catch (error) {
            throw error
            
        }
        next()
    }

    static async updateProduct(req, res, next) {
        const token = req.headers['authorization'].split(' ')[1];
        const id = Number(req.params.id);
        if(id){
            const {name, price, seuil, category, code_bare } = req.body;
            try {
                await ProductService.updateProduct(token, id, name, price, seuil, category, code_bare)
                res.status(201).json({message:"product has been update"});
            } catch (error) {
                throw error
            }
        }
        next()
    }

    static async deleteProduct(req, res, next) {
        const {id} = req.params; 
        try {
            await ProductService.deleteProduct(parseInt(id));
            res.status(200).json({ message: 'product has been deleted'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
        next()
    }
}
export default ProductController