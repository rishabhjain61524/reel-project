require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

// Connect to DB
connectDB();

// Only listen locally, not in production
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

// DO NOT export connectDB here. Only export the app!
module.exports = app;