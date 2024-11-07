import SaleService from '../services/SaleService.js ';

class SaleController {
  static async getAllSales(req, res) {
    try {
      const result = await SaleService.getSales();
      // Utilisation de la traduction pour "getSales"
      res
        .status(200)
        .json({ message: req.t('message.getSales'), data: result });
    } catch (error) {
      // Utilisation de la traduction pour "errorSale"
      res
        .status(500)
        .json({ message: req.t('message.errorSale'), error: error.message });
    }
  }

  static async createSale(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const { saleDetails, sale_at, name, phone, email } = req.body;
    try {
      await SaleService.createSale(
        token,
        saleDetails,
        sale_at,
        name,
        phone,
        email
      );
      // res.status(201).json({message:"sale has been created"});
      res.status(201).json({ message: req.t('message.createSale') });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ message: req.t('message.errorSale'), error: error.message });
    }
    next();
  }

  static async deleteSale(req, res, next) {
    const { id } = req.params;
    try {
      await SaleService.deleteSale(parseInt(id));
      res.status(200).json({ message: req.t('message.deleteSale') });
    } catch (error) {
      res
        .status(400)
        .json({ message: req.t('message.errorSale'), error: error.message });
    }
    next();
  }
}
export default SaleController;
