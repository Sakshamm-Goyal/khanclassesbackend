const express = require('express');
const router = express.Router();
const { reviewAndRating, getAllReviews } = require('../controllers/reviewAndRating');

router.post("/createReview", reviewAndRating);
router.get("/getAllReviews", getAllReviews);

module.exports = router;
