const foodPartnerModel = require("../models/foodpartner.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
    // ✅ FIX: Look for token in Headers instead of Cookies
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract 'token' from 'Bearer token'

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        req.foodPartner = foodPartner
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

async function authUserMiddleware(req, res, next) {
    // ✅ FIX: Look for token in Headers instead of Cookies
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id);
        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}