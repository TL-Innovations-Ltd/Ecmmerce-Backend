const { body, param } = require('express-validator');

exports.validateConfig = [
  body('user_id').isString().notEmpty().withMessage('User ID is required'),
  body('name').isString().notEmpty().withMessage('Name is required'),
  
  // Validate thumbnail object
  body('thumbnail')
    .optional()
    .isObject()
    .withMessage('Thumbnail must be an object')
    .bail()
    .custom((value) => {
      if (value) {
        if (value.url && typeof value.url !== 'string') {
          throw new Error('Thumbnail URL must be a string');
        }
        if (value.public_id && typeof value.public_id !== 'string') {
          throw new Error('Thumbnail public_id must be a string');
        }
      }
      return true;
    }),
  
  // Config validation - only check if it exists and is an object
  body('config')
    .exists().withMessage('Config is required')
    .bail()
    .isObject().withMessage('Config must be an object')
    .bail()
    .custom((value, { req }) => {
      // Pass through the config as-is without validation
      req.body.config = value;
      return true;
    })
];

exports.validateIdParam = [
  param('id').isString().notEmpty().withMessage('Configuration ID is required')
];

exports.validateUserIdParam = [
  param('userId').isString().notEmpty().withMessage('User ID is required')
];