const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('Product', productSchema);
