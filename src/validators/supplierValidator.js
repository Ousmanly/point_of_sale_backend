import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import SupplierService from '../services/SupplierService.js';
// import UserService from '../services/UserService.js';
// import UserService from '../Services/UserService.js';

const addRequestSupplierValidator = [
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];
const updateSupplierValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be a number!')
    .bail()
    .custom(async (value) => {
      const id = parseInt(value)
      const idExists = await SupplierService.checkSupplierById(id);
      if (!idExists) {
        throw new Error('supplier not found!');
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];
const deleteSupplierValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be a number!')
    .bail()
    .custom(async (value) => {
      const id = parseInt(value)
      const idExists = await SupplierService.checkSupplierById(id);
      if (!idExists) {
        throw new Error('Supplier not found!');
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
  addRequestSupplierValidator,
  updateSupplierValidatore,
  deleteSupplierValidatore
};

