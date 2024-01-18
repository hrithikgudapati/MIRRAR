const express = require('express');
const productController = require('../controllers/productControllers');
const router = express.Router();
router.get('/products/search', productController.searchProducts);

router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
