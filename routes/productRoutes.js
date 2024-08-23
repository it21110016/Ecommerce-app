const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:productID', getProductById);
router.put('/:productID', updateProduct);
router.delete('/:productID', deleteProduct);

module.exports = router;
