const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let foodItems = [
    {
        _id: '1',
        name: 'Surplus Margherita Pizza',
        price: 150,
        originalPrice: 450,
        quantity: '3 slices',
        expiryTime: new Date(Date.now() + 3600000).toISOString(),
        description: 'Freshly baked, slightly cooled. Perfect for a quick snack.',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&q=80',
        restaurant: { name: 'Pizza Palace' }
    },
    {
        _id: '2',
        name: 'Gourmet Veggie Burger',
        price: 80,
        originalPrice: 200,
        quantity: '2 units',
        expiryTime: new Date(Date.now() + 7200000).toISOString(),
        description: 'Healthy and delicious. Prepared 2 hours ago.',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
        restaurant: { name: 'Burger Haven' }
    },
    {
        _id: '3',
        name: 'Assorted Sushi Box',
        price: 300,
        originalPrice: 900,
        quantity: '1 box',
        expiryTime: new Date(Date.now() + 1800000).toISOString(),
        description: 'Premium sushi rolls. Must be consumed soon.',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
        restaurant: { name: 'Sushi Zen' }
    }
];

app.get('/api/food', (req, res) => {
    res.json(foodItems);
});

app.post('/api/auth/login', (req, res) => {
    res.json({
        token: 'mock-token',
        user: { name: 'Test Restaurant', email: req.body.email, role: 'restaurant' }
    });
});

app.post('/api/food', (req, res) => {
    const newItem = {
        _id: Date.now().toString(),
        ...req.body,
        restaurant: { name: 'Test Restaurant' }
    };
    foodItems.push(newItem);
    res.status(201).json(newItem);
});

app.get('/api/food/restaurant', (req, res) => {
    res.json(foodItems.filter(item => item.restaurant.name === 'Test Restaurant'));
});

app.listen(port, () => {
    console.log(`Mock API running at http://localhost:${port}`);
});
