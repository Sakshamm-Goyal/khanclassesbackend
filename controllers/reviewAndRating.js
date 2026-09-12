const Review = require('../models/review');

const normalizeText = (value) => value.trim().replace(/\s+/g, ' ');

exports.reviewAndRating = async (req, res) => {
    const submissionKey = req.get('Idempotency-Key');

    try {
        const name = normalizeText(req.body.name || '');
        const email = (req.body.email || '').trim().toLowerCase();
        const testimonial = normalizeText(req.body.testimonial || '');
        const rating = Number(req.body.rating);

        if (!name || !testimonial || !Number.isInteger(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a name, review, and a rating from 1 to 5.'
            });
        }

        const review = await Review.create({
            name,
            email,
            testimonial,
            rating,
            ...(submissionKey && { submissionKey })
        });

        return res.status(201).json({
            success: true,
            message: 'Review created successfully',
            data: review
        });
    } catch (err) {
        if (err.code === 11000 && submissionKey) {
            const review = await Review.findOne({ submissionKey });
            return res.status(200).json({
                success: true,
                duplicate: true,
                message: 'This review was already submitted.',
                data: review
            });
        }

        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1, _id: -1 });
        return res.status(200).json({
            success: true,
            message: 'Reviews retrieved successfully',
            data: reviews
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};
