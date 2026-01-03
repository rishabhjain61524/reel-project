const express = require('express');
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
});

/* POST /api/food/ [protected - Partners only] */
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood);

/* GET /api/food/ 
   CHANGE: If you want both Users AND Partners to see the feed, 
   you need a middleware that accepts both or remove strict auth for viewing.
*/
router.get("/",
    authMiddleware.authUserMiddleware, // 👈 This is why Partners get a 401
    foodController.getFoodItems);

/* POST /api/food/like [protected - Users only] */
router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood);

/* POST /api/food/save [protected - Users only] */
router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood);

/* GET /api/food/save [protected - Users only] */
router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood);

module.exports = router;