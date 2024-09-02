const express = require('express');
const Database = require('../database');
const validateReceipt = require('../middleware/receipts.middleware');
const { validationResult } = require('express-validator');

const db = new Database();

const processReceipt = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const id = db.addReceipt(req.body);
		res.status(200).send({ 'id': id });
	} catch(err) {
		res.status(500).send('Internal server error');
	}
};

const getPoints = async (req, res) => {
	try {
		let points = 0;
		const receipt = db.getReceiptById(req.params.id);
		// Rules for counting total points for a receipt:
		
		// 1 point per character in retailer name
		points += 1 * receipt.retailer.length;
		
		if (receipt.total % 1 === 0) {
			// 50 points if the total is a round dollar amount with no cents.
			points += 50;
		} else if ((receipt.total * 4) % 1 === 0) {
			// 25 points if the total is a multiple of 0.25
			points += 25;
		}
		const items = receipt.items;

		// 5 points for every two items on the receipt.
		const numItems = items.length;
		points += 5 * Math.floor(numItems / 2);

		// If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.

		res.status(200).send({ 'points': points.toFixed(2) });	
	} catch (err) {
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	processReceipt,
	getPoints
}
