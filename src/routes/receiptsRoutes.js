const express = require('express');
const router = express.Router();

const { processReceipt, getPoints } = require('../controllers/receiptsController');
const validateReceipt = require('../middleware/receipts.middleware');

router.post('/process', validateReceipt, processReceipt);
router.get('/:id/points', getPoints);

module.exports = router;
