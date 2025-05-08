const express = require('express');
const router = express.Router();

//Import Controller
const authController = require('../controllers/authController/authentication');

// Register user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);
  
module.exports = router;


