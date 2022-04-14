const express = require('express');
const router = express.Router();
const ProductController = require('../../controller/product')

router.post('/create', ProductController.addProduct);
router.get('/', ProductController.getProducts);
router.post('/update', ProductController.updateProduct);
router.post('/product-by-id', ProductController.getProductById);
router.post('/delete', ProductController.deleteProductById);

module.exports = router;
