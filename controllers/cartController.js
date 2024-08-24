const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add product to cart
const addToCart = async (req, res) => {
    try {
        const { productID, quantity } = req.body;

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart();
        }

        const product = await Product.findOne({ productID });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let name = product.name;

        const cartProduct = cart.products.find(p => p.productID === productID);
        if (cartProduct) {
            cartProduct.quantity += quantity;
        } else {
            cart.products.push({ productID, name, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
    try {
        const { productID } = req.body;
        let cart = await Cart.findOne();

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const productInCart = cart.products.find(p => p.productID === productID);
        if (!productInCart) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.products = cart.products.filter(p => p.productID !== productID);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne();
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        let cartTotal = 0;

        const populatedProducts = await Promise.all(cart.products.map(async item => {
            const product = await Product.findOne({ productID: item.productID });
            const itemTotal = product.price * item.quantity;
            cartTotal += itemTotal;

            return {
                productID: item.productID,
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: item.quantity,
                itemTotal
            };
        }));

        res.status(200).json({ products: populatedProducts, cartTotal });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update product quantity in cart
const updateCartQuantity = async (req, res) => {
    try {
        const { productID, quantity } = req.body;
        let cart = await Cart.findOne();

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const cartProduct = cart.products.find(p => p.productID === productID);
        if (!cartProduct) return res.status(404).json({ message: 'Product not found in cart' });

        cartProduct.quantity = quantity;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    getCart,
    updateCartQuantity
};
