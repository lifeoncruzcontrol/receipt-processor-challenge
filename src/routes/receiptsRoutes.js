const express = require('express');
const router = express.Router();

const { processReceipt, getPoints } = require('../controllers/receiptsController');

router.post('/process', processReceipt);
router.get('/:id/points', getPoints);

module.exports = router;
