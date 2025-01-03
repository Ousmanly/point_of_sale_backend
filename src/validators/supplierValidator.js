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
    .withMessage('Name must be at least 3 characters long!')
    .isLength({ max: 100 })
    .withMessage('Name must be maximum of 100 characters long!')
    .bail(),
  check('phone')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage('Phone number must be a string!')
    .isLength({ max: 50 })
    .withMessage('Phone must be maximum of 50 characters long!')
    .isLength({ min: 8 })
    .withMessage('Phone must be at least 8 characters long!')
    .bail()
    .custom(async (value) => {
      const emailExists = await SupplierService.checkSupplier(value);
      if (emailExists) {
        throw new Error('This phone number is already exist!');
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
      const id = parseInt(value);
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
    .isLength({ max: 100 })
    .withMessage('Name must be maximum of 100 characters long!')
    .bail(),
  check('phone')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage('phone number must be a string!')
    .isLength({ max: 50 })
    .withMessage('Phone must be maximum of 50 characters long!')
    .isLength({ min: 8 })
    .withMessage('Phone must be at least 8 characters long!')
    .bail()
    .custom(async (value, { req }) => {
      const id = req.params.id;
      const phone = value.toString();
      const result = await SupplierService.checkSupplier(phone, parseInt(id));
      if (result.length !== 0) {
        throw new Error('This phone number is already exist!');
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
      const id = parseInt(value);
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
  deleteSupplierValidatore,
};
