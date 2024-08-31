const { 
  v4: uuidv4
} = require('uuid');

class Database {
	#data; // # is so data is private and can only be accessed via getters and setters
	constructor(){
		this.#data = {
			receipts: new Map(),
			points: new Map()
		}; 
	}
	getUUID(){
		return uuidv4();
	}
	addReceipt(receipt){
		try {
			const uuid = uuidv4();
			this.#data.receipts.set(uuid, receipt);
			return
		} catch (err) {
			throw new Error("Error saving receipt to database: " + err);
		}
	};
	addPoints(points){
		try {
			const uuid = uuidv4();
			this.#data.points.set(uuid, points);
			return
		} catch (err) {
			throw new Error("Error saving points to database: " + err);
		}
	};
	getReceiptById(uuid){
		try {
			return this.#data.receipts.get(uuid);
		} catch (err) {
			throw new Error("Invalid UUID: " + err);
		}
	};
	getPointsById(uuid){
		try {
			return this.#data.points.get(uuid);
		} catch (err) {
			throw new Error("Invalid UUID: " + err)
		}	
	}
}

module.exports = Database;
