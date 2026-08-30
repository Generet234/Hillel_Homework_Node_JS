const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const roleMiddleware = require('../middlewares/roleMiddleware.js');

router.get('/products', productsController.getProducts)

router.get('/products/:id', productsController.getProductById)

router.post('/products',authMiddleware,roleMiddleware('admin'),productsController.createProduct)

router.put('/products/:id',authMiddleware,roleMiddleware('admin'), productsController.updateProduct)

router.delete('/products/:id',authMiddleware,roleMiddleware('admin'), productsController.deleteProduct)

module.exports = router;