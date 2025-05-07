const express = require('express');
const router = express.Router();

// Import the controllers
const createNewAddressController = require('../controllers/addressController/createAddress');
const listAddressController = require('../controllers/addressController/listAdress');
const searchAdresController = require('../controllers/addressController/searchAddress');
const updateAddressController = require('../controllers/addressController/updateAddress');

// Use the functions from controllers
router.post('/createAddress', createNewAddressController.createAddress);
router.get('/listAddress', listAddressController.listAddress);
router.get('/searchAddress', searchAdresController.searchForAddress);
router.post('/updateAddress/:id', updateAddressController.updateAddress);

module.exports = router;

