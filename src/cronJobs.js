// Import necessary modules: cron for scheduling tasks, axios for making HTTP requests
const cron = require('node-cron');
const axios = require('axios');
const Crypto = require('./models/Crypto'); // Import Crypto model to store fetched data

// Function to fetch cryptocurrency data from CoinGecko
const fetchCryptoData = async () => {
    try {
        const coins = ['bitcoin', 'matic-network', 'ethereum']; // List of coins to fetch data for
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price`, // CoinGecko API endpoint
            {
                params: {
                    ids: coins.join(','), // Join coin names into a single string for the API request
                    vs_currencies: 'usd', // Request USD value
                    include_market_cap: true, // Include market cap data
                    include_24hr_change: true, // Include 24-hour price change
                },
            }
        );

        // Loop through the response data and save each coin's data to the database
        for (const [coin, data] of Object.entries(response.data)) {
            await Crypto.create({
                coin,
                price: data.usd, // Store the current price in USD
                marketCap: data.usd_market_cap, // Store the market cap
                change24h: data.usd_24h_change, // Store the 24-hour price change
            });
        }
        console.log("Crypto data updated"); // Log success message
    } catch (error) {
        console.error("Error fetching crypto data", error); // Log error if fetching fails
    }
};

// Schedule the fetchCryptoData function to run every 2 hours (cron job)
cron.schedule('0 */2 * * *', fetchCryptoData);

// Export the fetchCryptoData function to be used elsewhere
module.exports = { fetchCryptoData };
