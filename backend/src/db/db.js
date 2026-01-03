const mongoose = require('mongoose');

function connectDB() {
    // Check if we are already connected to avoid multiple connections in Vercel
    if (mongoose.connection.readyState >= 1) return;

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log("MongoDB connection error:", err);
        });
}

module.exports = connectDB;