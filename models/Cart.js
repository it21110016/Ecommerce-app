const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
    ]
});

module.exports = mongoose.model('Cart', cartSchema);
