const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create an order
const createOrder = async (req, res) => {
    try {

        const cart = await Cart.findOne();
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        let totalPrice = 0;
        const orderProducts = [];

        for (const cartProduct of cart.products) {
            const product = await Product.findOne({ productID: cartProduct.productID });
            if (!product) return res.status(404).json({ message: `Product with ID ${cartProduct.productID} not found` });

            if (product.stock < cartProduct.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
            }

            totalPrice += product.price * cartProduct.quantity;

            product.stock -= cartProduct.quantity;
            await product.save();

            orderProducts.push({
                productID: product.productID,
                name: product.name,
                quantity: cartProduct.quantity
            });
        }

        const order = new Order({
            products: orderProducts,
            totalPrice
        });

        await order.save();

        await Cart.findByIdAndDelete(cart._id);

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createOrder
};