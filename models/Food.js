const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    expiryTime: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'collected'],
        default: 'available'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Food', FoodSchema);
