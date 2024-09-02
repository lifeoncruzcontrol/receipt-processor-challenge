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
		res.status(200).send('Points');	
	} catch (err) {
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	processReceipt,
	getPoints
}
