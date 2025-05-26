const { body, param } = require('express-validator');

exports.validateConfig = [
  body('id').isString().notEmpty().withMessage('ID is required'),
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('config').isObject().withMessage('Config must be an object'),
  body('config.lightType').isString().notEmpty().withMessage('Light type is required'),
  body('config.pendantCount').isInt({ min: 1 }).withMessage('Pendant count must be at least 1'),
  body('config.cableColor').isString().notEmpty().withMessage('Cable color is required'),
  body('config.cableLength').isString().notEmpty().withMessage('Cable length is required'),
  body('config.pendantDesigns')
    .isArray({ min: 1 })
    .withMessage('At least one pendant design is required')
];

exports.validateIdParam = [
  param('id').isString().notEmpty().withMessage('Configuration ID is required')
];

exports.validateUserIdParam = [
  param('userId').isString().notEmpty().withMessage('User ID is required')
];