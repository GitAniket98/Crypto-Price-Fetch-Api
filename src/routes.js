const express = require('express');
const Crypto = require('./models/Crypto'); // Import the Crypto model for database queries
const router = express.Router(); // Initialize a new router for handling routes

// Route to fetch the latest stats of a cryptocurrency
router.get('/stats', async (req, res) => {
    try {
        const { coin } = req.query; // Get the 'coin' query parameter from the request
        const latest = await Crypto.findOne({ coin }).sort({ timestamp: -1 }); // Fetch the latest record for the requested coin

        // If no record found, return a 404 error
        if (!latest) return res.status(404).json({ message: "Coin not found" });

        // Respond with the price, market cap, and 24-hour change of the latest record
        res.json({
            price: latest.price,
            marketCap: latest.marketCap,
            "24hChange": latest.change24h,
        });
    } catch (error) {
        // Catch any server-side errors and respond with a 500 status
        res.status(500).json({ error: "Server error" });
    }
});

// Route to calculate the standard deviation of a cryptocurrency's price
router.get('/deviation', async (req, res) => {
    try {
        const { coin } = req.query; // Get the 'coin' query parameter from the request
        const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100); // Fetch the latest 100 records for the coin

        // If no records found, return a 404 error
        if (records.length === 0) return res.status(404).json({ message: "Coin not found" });

        const prices = records.map(record => record.price); // Extract the prices from the records
        const mean = prices.reduce((a, b) => a + b, 0) / prices.length; // Calculate the mean (average) of the prices
        const deviation = Math.sqrt(prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length); // Calculate the standard deviation

        // Respond with the calculated standard deviation rounded to two decimal places
        res.json({ deviation: parseFloat(deviation.toFixed(2)) });
    } catch (error) {
        // Catch any server-side errors and respond with a 500 status
        res.status(500).json({ error: "Server error" });
    }
});

// Export the router to be used in other parts of the application
module.exports = router;
