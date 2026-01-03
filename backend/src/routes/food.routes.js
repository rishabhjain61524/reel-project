const express = require('express');
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
});

/**
 * @route   POST /api/food/
 * @desc    Upload a new food reel
 * @access  Protected (Partners Only)
 */
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood);

/**
 * @route   GET /api/food/
 * @desc    Get all food items for the feed
 * @access  PUBLIC (Recruiters & Guests can now see this!)
 */
router.get("/", 
    // authMiddleware.authUserMiddleware, 👈 REMOVED: Now anyone can view the reels
    foodController.getFoodItems);

/**
 * @route   POST /api/food/like
 * @desc    Like a video
 * @access  Protected (Users Only)
 */
router.post('/like',
    authMiddleware.authUserMiddleware, // 👈 KEPT: Users must still login to interact
    foodController.likeFood);

/**
 * @route   POST /api/food/save
 * @desc    Save a video
 * @access  Protected (Users Only)
 */
router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood);

/**
 * @route   GET /api/food/save
 * @desc    Get all saved videos for a user
 * @access  Protected (Users Only)
 */
router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood);

module.exports = router;