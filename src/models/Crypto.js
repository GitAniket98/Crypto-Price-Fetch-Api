// Import mongoose library to define schemas and interact with MongoDB
const mongoose = require('mongoose');

// Define a schema for storing cryptocurrency data
const CryptoSchema = new mongoose.Schema({
    coin: { type: String, required: true }, // Name of the cryptocurrency (e.g., 'bitcoin')
    price: { type: Number, required: true }, // Current price of the cryptocurrency in USD
    marketCap: { type: Number, required: true }, // Market capitalization of the cryptocurrency
    change24h: { type: Number, required: true }, // 24-hour percentage change in price
    timestamp: { type: Date, default: Date.now }, // Timestamp of when the data was saved (default is current time)
});

// Export the model based on the CryptoSchema to interact with the database
module.exports = mongoose.model('Crypto', CryptoSchema);
