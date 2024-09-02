const express = require('express');

const processReceipt = async (req, res) => {
	try {
		res.status(200).send('Receipt');	
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
