// import UserService from "../services/UserService.js";

import ProductService from "../services/ProductService.js";

class ProductController{
    static async getAllProducts(_req, res){
        const result = await ProductService.getProducts()
        res.status(201).json(result)
    }

    static async createProduct(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const { name, stock, sale_price, purchase_price, seuil, code_bare } = req.body;
        try {
            await ProductService.createProduct(token, name, stock, sale_price, purchase_price, seuil, code_bare);
            // res.status(201).json({message:"product has been created"});
            res.status(201).json({ message: req.t('message.createProduct') });
        } catch (error) {
            throw error
            
        }
        next()
    }

    static async updateProduct(req, res, next) {
        const token = req.headers['authorization'].split(' ')[1];
        const id = Number(req.params.id);
        if(id){
            const {name, price, sale_price, purchase_price, seuil, code_bare } = req.body;
            try {
                await ProductService.updateProduct(token, id, name, sale_price, purchase_price, seuil, code_bare)
                // res.status(201).json({message:"product has been update"});
                res.status(200).json({ message: req.t('message.updateProduct') });
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
            // res.status(200).json({ message: 'product has been deleted'});
            res.status(200).json({ message: req.t('message.deleteProduct') });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
        next()
    }
}
export default ProductController