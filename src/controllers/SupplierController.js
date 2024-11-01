import prisma from "../config/prisma.js";
import SupplierService from "../services/SupplierService.js";

class SupplierController{
    static async getAllSuppliers(_req, res){
        const result = await SupplierService.getSuppliers()
        res.status(201).json(result)
    }

    static async createSupplier(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const { name, phone, status } = req.body;
        try {
            await SupplierService.createSupplier(token, name, phone, status);
            // await SupplierService.createSupplier(name);
            // res.status(201).json({message:"suppliers has been created"});
            res.status(201).json({ message: req.t('message.createSupplier') });
        } catch (error) {
            throw error
            
        }
        next()
    }

    static async updateSupplier(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const id = Number(req.params.id);
        if(id){
            const { name, phone } = req.body;
            try {
                await SupplierService.updateSupplier(token,id, name, phone)
                // res.status(201).json({message:"supplier has been update"});
                res.status(200).json({ message: req.t('message.updateSupplier') })
            } catch (error) {
                throw error
            }
        }
        next()
    }
    static async updateSupplierStatus(req, res){
        const supplierId = parseInt(req.params.id, 10); // Récupérer l'ID depuis les paramètres de la requête
        const { status } = req.body; // Récupérer le statut depuis le corps de la requête
      
        try {
          const user = await prisma.supplier.update({
            where: { id: supplierId },
            data: { status: status },
          });
          res.status(200).json({ message: 'Supplier status updated successfully', user });
        } catch (error) {
          res.status(500).json({ message: 'Error updating supplier status', error });
        }
      };
    static async deleteSupplier(req, res, next) {
        const {id} = req.params; 
        try {
            await SupplierService.deleteSupplier(parseInt(id));
            // res.status(200).json({ message: 'supplier has been deleted'});
            res.status(200).json({ message: req.t('message.deleteSupplier') });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
        next()
    }
}
export default SupplierController