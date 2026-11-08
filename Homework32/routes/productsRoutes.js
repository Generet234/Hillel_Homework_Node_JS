const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Усі маршрути нижче захищені – доступ лише для авторизованих користувачів
router.use(authMiddleware);

router.get('/', productsController.getProducts);

router.post('/:id/attributes', productsController.addAttributesById)

router.get('/:id/attributes', productsController.getAttributesById)

router.post('/', productsController.createProduct);

router.get('/:id', productsController.getProductById);

router.put('/:id', productsController.updateProduct)

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
