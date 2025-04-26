const express = require('express');
const router = express.Router();

// Import the controller 
const listProductController = require('../controllers/productController/listProduct');
const addProductController = require('../controllers/productController/addProduct');
const removeProductController = require('../controllers/productController/removeProduct');
const updateProdcutController = require('../controllers/productController/updateProduct');
const countTotalProductController = require('../controllers/productController/countTotalProduct');
const viewProductDetialController = require('../controllers/userController/viewProductDetail');
const searchProductByNameController = require('../controllers/productController/searchProductName');
// Use the function from the controller
router.post('/addProducts',addProductController.addProduct)
router.get('/listProducts', listProductController.listProduct);
router.post('/removeProduct',removeProductController.removeProduct);
router.post('/updateProdct',updateProdcutController.updateProdcut);
router.get('/countTotalProduct',countTotalProductController.countTotalProduct);
router.get('/viewProductDetail/:id',viewProductDetialController.viewProductDetail);
router.get('/searchProduct',searchProductByNameController.searchForProduct);

module.exports = router;
