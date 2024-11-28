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
  check('name')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 4 characters long!')
    .isLength({ max: 100 })
    .withMessage('Name must be maximum of 100 characters long!')
    .bail(),
  check('saleDetails.*.sale_quantity')
    .not()
    .isEmpty()
    .withMessage('Quantity is required!')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a number greater than zero')
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

export { addSaleValidator, deleteSaleValidator };
