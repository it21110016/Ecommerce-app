const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            productID: {
                type: String,
                ref: 'Product',
                required: true
            },
            name: {
                type: String,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
