const express = require('express');
const router = express.Router();

// Import the controllers
const checkoutController = require('../controllers/orderController/checkout');
const cancelOrderController = require('../controllers/orderController/cancelOrder');
const listActiveOrderController = require('../controllers/orderController/listActiveOrder');
const orderHistoryController = require('../controllers/orderController/orderHistory');
const { or } = require('sequelize');

//Use function from controller
router.post('/checkout/:userId', checkoutController.checkoutCart)
router.post('/cancel/:userId', cancelOrderController.cancelOrder);
router.get('/activeOrder/:userId', listActiveOrderController.getActiveOrders);
router.get('/orderHistory/:userId', orderHistoryController.getOrderHistory);
module.exports = router;