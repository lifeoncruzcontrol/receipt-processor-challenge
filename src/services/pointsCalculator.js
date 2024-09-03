const express = require('express');

// Business logic for calculating points

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

const calculatePoints = (receipt) => {

	let points = 0;
	// Rules for counting total points for a receipt:
	
	// 1 point per alphanumeric character in retailer name
	const onlyAlphanum = receipt.retailer.replace(/[^a-zA-Z0-9]/g, '');
	points += 1 * onlyAlphanum.length;
	
	if (receipt.total % 1 === 0) {
		// 50 points if the total is a round dollar amount with no cents.
		points += 50;
	} 
	if (receipt.total % 0.25 === 0) {
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

	return points;
};

module.exports = calculatePoints;
