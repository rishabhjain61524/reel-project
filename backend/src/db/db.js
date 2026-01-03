const mongoose = require('mongoose');

const connectDB = async () => {
    // 1. Check if we are already connected (Essential for Vercel/Serverless)
    if (mongoose.connection.readyState >= 1) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        // 2. Use 'await' to ensure the connection is ready before moving to the next line
        await mongoose.connect(process.env.MONGODB_URI, {
            // Fails faster (5s) if your IP is blocked by MongoDB Atlas
            serverSelectionTimeoutMS: 5000, 
        });
        
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        // 3. Log errors to your Vercel logs so you can see if the password/URI is wrong
        console.error("❌ MongoDB connection error:", err.message);
        
        // Throwing the error ensures the function doesn't try to run login code without a DB
        throw err; 
    }
};

module.exports = connectDB;