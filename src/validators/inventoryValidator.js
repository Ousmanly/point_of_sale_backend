import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
// import SupplierService from '../services/SupplierService.js';
import ProductService from '../services/ProductService.js';
// import ReceptionService from '../services/ReceptionService.js';
const addRequestInventoryValidator = [
  check('id_product')
    .not()
    .isEmpty()
    .withMessage('product id is required!')
    .bail()
    .custom(async (value) => {
        const id = parseInt(value)
        const idExists = await ProductService.checkProductById(id);
        if (!idExists) {
        throw new Error('product not found!');
        }
        return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];


export {
    addRequestInventoryValidator,
};

