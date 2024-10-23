import SaleService from "../services/SaleService.js ";

class SaleController{

    static async getAllSales(_req, res){
        const result = await SaleService.getSales()
        res.status(201).json(result)
    }

    static async createSale(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const { saleDetails, sale_at } = req.body;
        try {
            await SaleService.createSale(token, saleDetails, sale_at);
            res.status(201).json({message:"sale has been created"});
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
            
        }
        next()
    }

    static async deleteSale(req, res, next) {
        const {id} = req.params; 
        try {
            await SaleService.deleteSale(parseInt(id));
            res.status(200).json({ message: 'sale has been deleted'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
        next()
    }
}
export default SaleController