import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import SupplierService from '../services/SupplierService.js';
import ProductService from '../services/ProductService.js';
import ReceptionService from '../services/ReceptionService.js';
const addRequestReceptionValidator = [
  check('id_supplier')
    .not()
    .isEmpty()
    .withMessage('supplier id is required!')
    .bail()
    .toInt()
    .custom(async (value) => {
      const id = parseInt(value);
      const idExists = await SupplierService.checkSupplierById(id);
      if (!idExists) {
        throw new Error('supplier not found!');
      }
      return true;
    })
    .bail(),
  check('recepted_at')
    .not()
    .isEmpty()
    .withMessage('Date of reception is required!')
    .bail(),
  check('receptionDetails.*.id_product')
    .not()
    .isEmpty()
    .withMessage('product id is required!')
    .bail()
    .custom(async (value) => {
      const id = parseInt(value);
      const idExists = await ProductService.checkProductById(id);
      if (!idExists) {
        throw new Error('product not found!');
      }
      return true;
    })
    .bail(),
  check('receptionDetails.*.quantity')
    .not()
    .isEmpty()
    .withMessage('quantity id is required!')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a number greater than zero'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const deleteReceptionValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('reception id is required!')
    .bail()
    .toInt()
    .custom(async (value) => {
      const id = parseInt(value);
      const idExists = await ReceptionService.checkReceptionById(id);
      if (!idExists) {
        throw new Error('reception not found!');
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

export { addRequestReceptionValidator, deleteReceptionValidatore };
