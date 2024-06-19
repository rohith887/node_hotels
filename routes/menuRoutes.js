const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


router.post('/', async (req, res) => 
{
    try {
        const data = req.body;
        console.log('Received data:', data); 
        const newMenu = new MenuItem(data); 
        const response = await newMenu.save();
        console.log('Saved data:', response); 
        res.status(200).json(response);
    } 
    catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:Tastes', async (req, res) => {
    try {
        const Tastes = req.params.Tastes; 
        if (Tastes === 'sweet' || Tastes === 'sour' || Tastes === 'spicy') 
        {
            const response = await MenuItem.find({ taste : Tastes});
            console.log('Response fetched:', response); 
            res.status(200).json(response);
        } 
        else 
        {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } 
    catch (err) 
    {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) =>
{
    try {
        const data = await MenuItem.find();
        console.log('Data fetched:', data); 
        res.status(200).json(data);
    } 
    catch (err) 
    {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router; 