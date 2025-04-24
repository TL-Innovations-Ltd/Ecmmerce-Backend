const express = require('express');
const router = express.Router();
const Category = require('./models/model');

// Create a new category
router.post('/add', async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({
            name: name
        });
        await category.save();
        res.status(201).json({success : true , message : 'Category added successfully'});
    } catch (err) {
        res.status(400).json({ success : false , error: err.message });
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ success : false , error: err.message });
    }
});

// Update a category by ID
router.put('/update/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name : name},
            { new: true, runValidators: true }
        );
        if (!category) return res.status(404).json({ success : false , error: 'Category not found' });
        res.status(200).json({success : true , message : 'Category updated successfully'});
    } catch (err) {
        res.status(400).json({ success : false , error: err.message });
    }
});

// Delete a category by ID
router.delete('/remove/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ success : false , error: 'Category not found' });
        res.status(200).json({success : true , message : 'Category deleted successfully'});
    } catch (err) {
        res.status(400).json({ success : false , error: err.message });
    }
});

module.exports = router;