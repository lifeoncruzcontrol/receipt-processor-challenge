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

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

const getPoints = async (req, res) => {
	try {
		let points = 0;
		const receipt = db.getReceiptById(req.params.id);
		// Rules for counting total points for a receipt:
		
		// 1 point per alphanumeric character in retailer name
		const onlyAlphanum = receipt.retailer.replace(/[^a-zA-Z0-9]/g, '');
		points += 1 * onlyAlphanum.length;
		
		if (receipt.total % 1 === 0) {
			// 50 points if the total is a round dollar amount with no cents.
			points += 50;
		} 
		if ((receipt.total * 4) % 1 === 0) {
			// 25 points if the total is a multiple of 0.25
			points += 25;
		}
		const items = receipt.items;

		// 5 points for every two items on the receipt.
		const numItems = items.length;
		points += 5 * Math.floor(numItems / 2);

		// If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
		items.forEach(item => {
			// remove all whitespace from description
			const trimmed = item.shortDescription.trim();
			if (trimmed.length % 3 === 0) {
				points += Math.ceil(item.price * 0.2);
			}
		});

		// 6 points if the day in the purchase date is odd.
		const day = receipt.purchaseDate.split('-')[2];
		if (day % 2 != 0) {
			points += 6
		}

		// 10 points if the time of purchase is after 2:00pm and before 4:00pm.
		const time = timeToMinutes(receipt.purchaseTime);
		const start = timeToMinutes("14:00");
		const end = timeToMinutes("16:00");
		
		if (time >= start && time <= end) {
			points += 10;
		}

		res.status(200).send({ 'points': points.toFixed(2) });	
	} catch (err) {
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	processReceipt,
	getPoints
}
