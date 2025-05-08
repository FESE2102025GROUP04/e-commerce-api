const express = require('express');
const router = express.Router();
const { or } = require('sequelize');
// Import the controllers
const checkoutController = require('../controllers/orderController/checkout');
const cancelOrderController = require('../controllers/orderController/cancelOrder');
const listActiveOrderController = require('../controllers/orderController/listActiveOrder');
const orderHistoryController = require('../controllers/orderController/orderHistory');
const listOrderByStatusController = require('../controllers/orderController/listOrderByStatus');
const cancelOrderByAdminController = require('../controllers/orderController/adminCancelOrder');
const updateOrderStatusController = require('../controllers/orderController/updateOrderStatus');
const totalPurchaseEachDayController = require('../controllers/orderController/totalPurchaseEachDay');
const topProductsProductController = require('../controllers/orderController/topPurchaseProduct');
//Use function from controller
router.post('/checkout/:userId', checkoutController.checkoutCart)
router.post('/cancel/:userId', cancelOrderController.cancelOrder);
router.get('/activeOrder/:userId', listActiveOrderController.getActiveOrders);
router.get('/orderHistory/:userId', orderHistoryController.getOrderHistory);
router.get('/orderStatus', listOrderByStatusController.listAdminOrders);
router.post('/admincancelOrder/:userId', cancelOrderByAdminController.cancelOrder);
router.post('/updateOrderStatus', updateOrderStatusController.updateOrderStatus);
router.post('/totalPurchase', totalPurchaseEachDayController.getTotalPurchasedPriceByDay);
router.get('/topProduct', topProductsProductController.getTop10ProductsByQuantity);
module.exports = router;