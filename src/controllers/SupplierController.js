import SupplierService from "../services/SupplierService.js";

class SupplierController{
    static async getAllSuppliers(_req, res){
        const result = await SupplierService.getSuppliers()
        res.status(201).json(result)
    }

    static async createSupplier(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const { name } = req.body;
        try {
            await SupplierService.createSupplier(token, name);
            res.status(201).json({message:"suppliers has been created"});
        } catch (error) {
            throw error
            
        }
        next()
    }

    static async updateSupplier(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const id = Number(req.params.id);
        if(id){
            const { name } = req.body;
            try {
                await SupplierService.updateSupplier(token,id, name)
                res.status(201).json({message:"supplier has been update"});
            } catch (error) {
                throw error
            }
        }
        next()
    }

    static async deleteSupplier(req, res, next) {
        const {id} = req.params; 
        try {
            await SupplierService.deleteSupplier(parseInt(id));
            res.status(200).json({ message: 'user has been deleted'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
        next()
    }
}
export default SupplierController