const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        testimonial: {
            type: String,
            required: true,
            trim: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        submissionKey: {
            type: String,
            unique: true,
            sparse: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
