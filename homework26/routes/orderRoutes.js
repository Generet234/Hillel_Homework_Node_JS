const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const authMiddleware = require("../middlewares/authMiddleware");
const {roleMiddleware} = require("../middlewares/roleMiddleware");
const {customerMiddleware} = require("../middlewares/roleMiddleware");

router.post('/api/orders', orderController.makeOrder)

router.get('/api/orders',authMiddleware,customerMiddleware('customer'), orderController.getMyOrders)

router.get('/api/orders',authMiddleware,roleMiddleware('admin'), orderController.getAllOrders)

router.get('/api/orders/:id',authMiddleware,customerMiddleware('customer'), orderController.getMyOrdersById)

router.patch('/api/orders/:id/status', authMiddleware,roleMiddleware('admin'), orderController.getStatus)

module.exports = router;