const Review = require('../models/review');

exports.reviewAndRating = async (req, res) => {
    try {
        const { name, email, testimonial, rating } = req.body;

        if (!name  || !testimonial || rating === undefined) {
            return res.status(400).json({
                success: false,
                message: "Fill all fields carefully"
            });
        }

        const response = await Review.create({ name, email, testimonial, rating });

        res.status(200).json({
            success: true,
            message: "Review created successfully",
            data: response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({
            success: true,
            message: "Reviews retrieved successfully",
            data: reviews
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};
