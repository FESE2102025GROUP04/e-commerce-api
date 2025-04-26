var express = require('express');
var router = express.Router();

// Import the controller
const addUserController = require('../controllers/userController/addAdmin');
const listUserController = require('../controllers/userController/listAllUser');
const listAllAdminController = require('../controllers/userController/listAllAdmin');
const listAllConsumerController = require('../controllers/userController/listConsumer');
const viewAdminDetailController = require('../controllers/userController/viewAdminDetail');
const viewConsumerDetailController = require('../controllers/userController/viewConsumerDetail.js');
const removeUserController = require('../controllers/userController/removeUser');
const updateUserInfoController = require('../controllers/userController/updateUserInfo');
const countAllUserController = require('../controllers/userController/countTotalUser');
const searchConsumerController = require('../controllers/userController/searchConsumer');
const searchAdminController = require('../controllers/userController/searchAdmin.js');

//Use the function from controller
router.post('/addUser', addUserController.addUser);
router.get('/listUser', listUserController.listAllUser);
router.get('/listAdmin', listAllAdminController.listAllAdmin);
router.get('/listConsumer', listAllConsumerController.listAllConsumer);
router.get('/adminDetail/:id', viewAdminDetailController.viewAdminDetail);
router.get('/consumerDetail/:id', viewConsumerDetailController.viewCosumerDetail);
router.post('/removeUser', removeUserController.removeUser);
router.get('/countTotalUser', countAllUserController.countTotalUser);
router.post('/updateUserInfo', updateUserInfoController.updateUserInfo);
router.get('/searchConsumer', searchConsumerController.searchForConsumer);
router.get('/searchAdmin',searchAdminController.searchForAdmin);
module.exports = router;
