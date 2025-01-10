// Load environment variables from .env
require('dotenv').config();

// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // 30s timeout for connection
        });
        console.log("MongoDB Atlas connected");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // Exit if connection fails
    }
};

// Export the connection function
module.exports = connectDB;
