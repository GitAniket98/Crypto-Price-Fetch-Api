const express = require('express');
const connectDB = require('./db'); // Handles database connection
const routes = require('./routes'); // API routes
const { fetchCryptoData } = require('./cronJobs'); // Background job for fetching crypto data

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Start background job to fetch crypto data every 2 hours
fetchCryptoData();

app.use(express.json()); // Parse incoming JSON
app.use('/api', routes); // API routes start with /api

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
