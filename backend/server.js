require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

// ✅ Trigger the async connection and handle potential errors
connectDB().catch(err => {
    console.error("Critical Database Connection Error:", err);
});

// Only listen locally, not in production
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

// DO NOT export connectDB here. Only export the app!
module.exports = app;