const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Food = require('../models/Food');

// @route   GET api/food
// @desc    Get all available and non-expired food listings
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find({ 
            status: 'available',
            expiryTime: { $gt: new Date() }
        }).populate('restaurant', ['name', 'email']).sort({ date: -1 });
        res.json(foods);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/food/reserve/:id
// @desc    Reserve a food item
router.put('/reserve/:id', async (req, res) => {
    try {
        let food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ msg: 'Food item not found' });
        
        if (food.status !== 'available') {
            return res.status(400).json({ msg: 'Food is no longer available' });
        }

        food.status = 'reserved';
        await food.save();
        res.json({ msg: 'Food reserved successfully', food });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/food
// @desc    Add a surplus food listing
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'restaurant') {
        return res.status(403).json({ msg: 'Unauthorized: Only restaurants can list food' });
    }

    const { name, originalPrice, price, quantity, expiryTime, description, image } = req.body;

    try {
        const newFood = new Food({
            restaurant: req.user.id,
            name,
            originalPrice,
            price,
            quantity,
            expiryTime,
            description,
            image
        });

        const food = await newFood.save();
        res.json(food);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/food/restaurant
// @desc    Get listings for the logged-in restaurant
router.get('/restaurant', auth, async (req, res) => {
    try {
        const foods = await Food.find({ restaurant: req.user.id }).sort({ date: -1 });
        res.json(foods);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
