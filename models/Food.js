const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the food schema
const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    cart_status: {
        type: String,
    },
    reviews: [
        {
            reviewer: { type: String }, // Name of the reviewer
            rating: { type: Number, min: 1, max: 5 }, // Rating between 1 and 5
            comment: { type: String}, // Optional comment
        },
    ],
});

// Create the food model
const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
