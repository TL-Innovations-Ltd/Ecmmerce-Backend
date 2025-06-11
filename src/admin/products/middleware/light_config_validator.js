const { body, param } = require('express-validator');

exports.validateConfig = [
  body('user_id').isString().notEmpty().withMessage('User ID is required'),
  body('name').isString().notEmpty().withMessage('Name is required'),
  
  // Validate thumbnail object
  body('thumbnail')
    .exists()
    .withMessage('Thumbnail is required')
    .bail()
    .custom((value) => {
      if (typeof value !== 'object' || value === null) {
        throw new Error('Thumbnail must be an object');
      }
      if (!value.url || typeof value.url !== 'string') {
        throw new Error('Thumbnail must have a valid URL string');
      }
      if (!value.public_id || typeof value.public_id !== 'string') {
        throw new Error('Thumbnail must have a public_id string');
      }
      return true;
    }),
  
  // Validate config object
  body('config').isObject().withMessage('Config must be an object'),
  body('config.lightType').isString().notEmpty().withMessage('Light type is required'),
  body('config.pendantCount').isInt({ min: 0 }).withMessage('Pendant count must be a positive number'),
  body('config.cableColor').isString().notEmpty().withMessage('Cable color is required'),
  body('config.cableLength').isString().notEmpty().withMessage('Cable length is required'),
  body('config.pendantDesigns')
    .isArray({ min: 0 })
    .withMessage('Pendant designs must be an array')
];

exports.validateIdParam = [
  param('id').isString().notEmpty().withMessage('Configuration ID is required')
];

exports.validateUserIdParam = [
  param('userId').isString().notEmpty().withMessage('User ID is required')
];