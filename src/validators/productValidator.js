import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/ProductService.js';
// import ProductModel from '../models/ProductModel.js';

const addRequestProductValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage("name can't be a number!")
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long!')
    .bail(),
  check('sale_price')
    .not()
    .isEmpty()
    .withMessage('sale_price is required!')
    .bail(),
  check('purchase_price')
    .not()
    .isEmpty()
    .withMessage('purchase_price is required!')
    .bail(),
  check('seuil').not().isEmpty().withMessage('seuil is required!').bail(),
  check('code_bare')
    .not()
    .isEmpty()
    .withMessage('code_bare is required!')
    .bail()
    .custom(async (value) => {
      const codeBareExists = await ProductService.checkProduct(value);
      if (codeBareExists) {
        throw new Error('This code_bare is already exist!');
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
const updateProductValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be a number!')
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
  check('name')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage("name can't be a number!")
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long!')
    .bail(),
  check('sale_price')
    .not()
    .isEmpty()
    .withMessage('sale_price is required!')
    .bail(),
  check('purchase_price')
    .not()
    .isEmpty()
    .withMessage('purchase_price is required!')
    .bail(),
  check('seuil').not().isEmpty().withMessage('seuil is required!').bail(),
  check('code_bare')
    .not()
    .isEmpty()
    .withMessage('code_bare is required!')
    .bail()
    .isLength({ min: 4 })
    .withMessage('code_bare must be at least 4 characters long!')
    .bail()
    .custom(async (value, { req }) => {
      const id = req.params.id;
      const result = await ProductService.checkProduct(value, parseInt(id));
      if (result.length !== 0) {
        throw new Error('This code_bare is already exist!');
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
const deleteProductValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be a number!')
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
  addRequestProductValidator,
  updateProductValidatore,
  deleteProductValidatore,
};
