const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const { v4: uuid } = require("uuid");

// --- CREATE FOOD (Partners Only) ---
async function createFood(req, res) {
    try {
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: "Food created successfully",
            food: foodItem
        });
    } catch (error) {
        res.status(500).json({ message: "Error uploading food item", error: error.message });
    }
}

// --- GET ALL FOOD (Public - Recruiter Friendly) ---
async function getFoodItems(req, res) {
    try {
        // .populate('foodPartner', 'name') helps show who uploaded the video
        const foodItems = await foodModel.find({}).populate('foodPartner', 'name'); 
        
        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems // This matches your frontend 'response.data.foodItems'
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching food items" });
    }
}

// --- LIKE FOOD (Protected) ---
async function likeFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user; // Provided by authMiddleware.authUserMiddleware

        const isAlreadyLiked = await likeModel.findOne({ user: user._id, food: foodId });

        if (isAlreadyLiked) {
            await likeModel.deleteOne({ _id: isAlreadyLiked._id });
            await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

            return res.status(200).json({ message: "Food unliked successfully", like: false });
        }

        const like = await likeModel.create({ user: user._id, food: foodId });
        await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

        res.status(201).json({ message: "Food liked successfully", like: true });
    } catch (error) {
        res.status(500).json({ message: "Error processing like" });
    }
}

// --- SAVE FOOD (Protected) ---
async function saveFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        const isAlreadySaved = await saveModel.findOne({ user: user._id, food: foodId });

        if (isAlreadySaved) {
            await saveModel.deleteOne({ _id: isAlreadySaved._id });
            await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: -1 } });

            return res.status(200).json({ message: "Food unsaved successfully", save: false });
        }

        const save = await saveModel.create({ user: user._id, food: foodId });
        await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } });

        res.status(201).json({ message: "Food saved successfully", save: true });
    } catch (error) {
        res.status(500).json({ message: "Error processing save" });
    }
}

// --- GET SAVED FOOD (Protected) ---
async function getSaveFood(req, res) {
    try {
        const user = req.user;
        const savedFoods = await saveModel.find({ user: user._id }).populate('food');

        res.status(200).json({
            message: "Saved foods retrieved successfully",
            savedFoods: savedFoods || []
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving saved foods" });
    }
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood
};