const Product = require('../models/Product');

//Adding a product
const createProduct = async (req, res) => {
    try {
        const existingProduct = await Product.findOne({ productID: req.body.productID });
        if (existingProduct) {
            return res.status(400).json({ message: 'ProductID already exists' });
        }

        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a product by productID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ productID: req.params.productID });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const updateData = req.body;

        for (const key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                if (updateData[key] === '' || updateData[key] === null || updateData[key] === undefined) {
                    return res.status(400).json({ message: `${key} cannot be empty or null` });
                }
            }
        }

        const product = await Product.findOneAndUpdate(
            { productID: req.params.productID },
            updateData,
            { new: true }
        );

        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ productID: req.params.productID });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};