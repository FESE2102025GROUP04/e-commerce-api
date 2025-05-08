const express = require('express');
const router = express.Router();

// Import the controllers
const listAllCartItemController = require('../controllers/cartController/listAllCartItem');
const addItemToCartController = require('../controllers/cartController/addItemToCart');
const removeItemFromCartController = require('../controllers/cartController/removeItemFromCart');
const decreaseCartItemQtyController = require('../controllers/cartController/decreaseQty');

//Use function from controller
router.get('/listCartItem/:userId', listAllCartItemController.listCartItems);
router.post('/addToCart/:userId', addItemToCartController.addToCart);
router.post('/removeFromCart/:userId', removeItemFromCartController.removeFromCart);
router.post('/decreaseItem/:userId',decreaseCartItemQtyController.decreaseCartItemQty);

module.exports = router;