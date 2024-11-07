// import UserService from "../services/UserService.js";

import InventoryService from '../services/InventoryService.js';

class InventoryController {
  static async getAllInventories(_req, res) {
    const result = await InventoryService.getInventory();
    res.status(201).json(result);
  }

  static async createInventory(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const { id_product, quantity, remarque } = req.body;

    try {
      await InventoryService.addInventory(
        token,
        id_product,
        quantity,
        remarque
      );
      //   res.status(201).json({ message: "Inventory has been created"});
      res.status(201).json({ message: req.t('message.createInventory') });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    next();
  }
  // static async createProduct(req, res, next) {
  //     const token = req.headers.authorization.split(' ')[1];
  //     const { name, stock, price, seuil, category, code_bare } = req.body;
  //     try {
  //         await ProductService.createProduct(token, name, stock, price, seuil, category, code_bare);
  //         res.status(201).json({message:"product has been created"});
  //     } catch (error) {
  //         throw error

  //     }
  //     next()
  // }

  // static async updateProduct(req, res, next) {
  //     const token = req.headers['authorization'].split(' ')[1];
  //     const id = Number(req.params.id);
  //     if(id){
  //         const {name, price, seuil, category, code_bare } = req.body;
  //         try {
  //             await ProductService.updateProduct(token, id, name, price, seuil, category, code_bare)
  //             res.status(201).json({message:"product has been update"});
  //         } catch (error) {
  //             throw error
  //         }
  //     }
  //     next()
  // }

  // static async deleteProduct(req, res, next) {
  //     const {id} = req.params;
  //     try {
  //         await ProductService.deleteProduct(parseInt(id));
  //         res.status(200).json({ message: 'product has been deleted'});
  //     } catch (error) {
  //         res.status(400).json({ message: error.message });
  //     }
  //     next()
  // }
}
export default InventoryController;
