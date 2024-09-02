const { body } = require('express-validator');

const validateReceipt = [
  body('retailer')
    .exists().withMessage('Retailer is required')
    .isString().withMessage('Retailer must be a string'),

  body('purchaseDate')
    .exists().withMessage('Purchase date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Invalid date format. Expected yyyy-mm-dd')
    .isISO8601().withMessage('Invalid ISO date format'),

  body('purchaseTime')
    .exists().withMessage('Purchase time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid time format'),

  body('items')
    .exists().withMessage('Items are required')
    .isArray().withMessage('Items must be an array')
    .custom(items => {
      if (!Array.isArray(items)) {
        throw new Error('Items must be an array');
      }

      items.forEach((item, index) => {
        if (typeof item !== 'object' || item === null) {
          throw new Error(`Item at index ${index} must be an object`);
        }
        if (!item.shortDescription || typeof item.shortDescription !== 'string') {
          throw new Error(`Item at index ${index} must have a valid 'shortDescription'`);
        }
        if (!item.price || typeof item.price !== 'string' || !/^\d+(\.\d{2})?$/.test(item.price)) {
          throw new Error(`Item at index ${index} must have a valid 'price'`);
        }
      });

      return true;
    }),

  body('total')
    .exists().withMessage('Total is required')
    .isString().withMessage('Total must be a string')
    .matches(/^\d+(\.\d{2})?$/).withMessage('Total must be a valid decimal')
];

module.exports = validateReceipt;
