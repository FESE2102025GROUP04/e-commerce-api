const express = require('express');
const router = express.Router();
//Import Controller

const createCategoryController = require('../controllers/categoryController/createCategory');
const listAllCategoryContrller = require('../controllers/categoryController/listAllCategory');
const searchForCategoryController = require('../controllers/categoryController/searchCategoryByName');
const updateCategoryController = require('../controllers/categoryController/updateCategoryInfo');
const getEachCategoryController = require('../controllers/categoryController/getEachCategory');
//Use function from controller 

router.post('/createCategory', createCategoryController.createCategory);
router.get('/listCategory', listAllCategoryContrller.listCategories);
router.get('/searchCategory', searchForCategoryController.searchForCategory);
router.post('/updateCategoryInfo', updateCategoryController.updateCategory);
router.get('/:id',getEachCategoryController.getCategory);

module.exports = router