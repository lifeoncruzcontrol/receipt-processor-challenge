const { body } = require('express-validator');

const validateReceipt = [
  body('retailer').isString(),
  body('purchaseDate').isISO8601().withMessage('Invalid date format'),
  body('purchaseTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid time format'),
  body('items').isArray().withMessage('Items must be an array'),
  body('items.*.price').isString().matches(/^\d+(\.\d{2})?$/).withMessage('Price must be a valid decimal'),
  body('total').isString().matches(/^\d+(\.\d{2})?$/).withMessage('Total must be a valid decimal')
];

module.exports = validateReceipt;
