// import SupplierService from "../services/SupplierService.js";

import ReceptionService from "../services/ReceptionService.js";

class ReceptionController{

    static async getAllReceptions(_req, res){
        const result = await ReceptionService.getReceptions()
        res.status(201).json(result)
    }

    static async createReception(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const { id_supplier,recepted_at, receptionDetails } = req.body;
        try {
            await ReceptionService.addReception(token, id_supplier, recepted_at, receptionDetails);
            res.status(201).json({message:"reception has been created"});
        } catch (error) {
            throw error
            
        }
        next()
    }

    static async deleteReception(req, res, next) {
        const {id} = req.params; 
        try {
            await ReceptionService.deleteReception(parseInt(id));
            res.status(200).json({ message: 'reception has been deleted'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
        next()
    }
}
export default ReceptionController