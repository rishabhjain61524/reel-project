const mongoose = require('mongoose');

const connectDB = async () => {
    // 1. Check if we already have a connection (essential for Vercel/Serverless)
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        // 2. Use 'await' to ensure the connection is established BEFORE continuing
        await mongoose.connect(process.env.MONGODB_URI, {
            // This tells Mongoose to fail faster if the IP is blocked
            serverSelectionTimeoutMS: 5000, 
        });
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        // On Vercel, don't use process.exit(1); just let the error throw
        throw err; 
    }
};

module.exports = connectDB;