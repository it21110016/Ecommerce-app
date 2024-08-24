const express = require('express');
const router = express.Router();
const {
    addToCart,
    removeFromCart,
    getCart,
    updateCartQuantity
} = require('../controllers/cartController');

router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.get('/', getCart);
router.post('/update', updateCartQuantity);

module.exports = router;
