const express = require('express');
const router = express.Router();

// Import the controller 
const listProductController = require('../controllers/productController/listProduct');
const getProductController = require('../controllers/productController/getEachProduct');
const addProductController = require('../controllers/productController/addProduct');
const removeProductController = require('../controllers/productController/removeProduct');
const updateProdcutController = require('../controllers/productController/updateProduct');
const countTotalProductController = require('../controllers/productController/countTotalProduct');
const viewProductDetialController = require('../controllers/userController/viewProductDetail');
const searchProductByNameController = require('../controllers/productController/searchProductName');
const filterProductController = require('../controllers/productController/filterProduct');


// Use the function from the controller
router.post('/addProducts',addProductController.addProduct)
router.get('/listProducts', listProductController.listProduct);
router.get('/getEachProduct/:id', getProductController.getProduct);
router.post('/removeProduct',removeProductController.removeProduct);
router.post('/updateProdct',updateProdcutController.updateProdcut);
router.get('/countTotalProduct',countTotalProductController.countTotalProduct);
router.get('/viewProductDetail/:id',viewProductDetialController.viewProductDetail);
router.get('/searchProduct',searchProductByNameController.searchForProduct);
router.get('/filter', filterProductController.filterProducts);
module.exports = router;
