const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');

const app = express();

// ✅ FIX: Enhanced CORS configuration
app.use(cors({
    origin: [
        process.env.FRONTEND_URL, 
        "https://reel-project-99y2.vercel.app", // Your specific frontend URL
        "http://localhost:5173"                // Local development
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"] // Essential for JWT tokens
}));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running and connected to MongoDB.");
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;