const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // findOne() will now work because of whitelisting and proper db.js await
        const user = await userModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);

        // Send token in JSON so frontend can save to LocalStorage
        res.status(200).json({
            message: "User logged in successfully",
            token: token, 
            user: { _id: user._id, email: user.email, fullName: user.fullName }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function loginFoodPartner(req, res) {
    try {
        const { email, password } = req.body;
        const foodPartner = await foodPartnerModel.findOne({ email });

        if (!foodPartner || !(await bcrypt.compare(password, foodPartner.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(foodPartner._id);

        res.status(200).json({
            message: "Food partner logged in successfully",
            token: token,
            foodPartner: { _id: foodPartner._id, email: foodPartner.email, name: foodPartner.name }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// ... register functions should also return { token, user } in the same way
module.exports = { loginUser, loginFoodPartner /*, ... others */ };