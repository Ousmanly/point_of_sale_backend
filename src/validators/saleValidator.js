import { check, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/ProductService.js';
import SaleService from '../services/SaleService.js';

const addSaleValidator = [
  check('saleDetails.*.id_product')
    .not()
    .isEmpty()
    .withMessage('Product ID is required!')
    .bail()
    .custom(async (value) => {
      const id = parseInt(value);
      const idExists = await ProductService.checkProductById(id);
      if (!idExists) {
        throw new Error('Product not found!');
      }
      return true;
    })
    .bail(),
  check('sale_at')
    .not()
    .isEmpty()
    .withMessage('Date of sale ID is required!')
    .bail(),

  check('saleDetails.*.sale_quantity')
    .not()
    .isEmpty()
    .withMessage('Quantity is required!')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('Quantity must be a positive integer!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

const deleteSaleValidator = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Sale ID is required!')
    .bail()
    .toInt()
    .withMessage('Sale ID must be an integer!')
    .bail()
    .custom(async (value) => {
      const id = parseInt(value);
      const idExists = await SaleService.checkSaleById(id);
      if (!idExists) {
        throw new Error('Sale not found!');
      }
      return true;
    }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

export {
  addSaleValidator,
  deleteSaleValidator
};
