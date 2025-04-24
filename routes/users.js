var express = require('express');
var router = express.Router();


// Import the controller
const addUserController = require('../controllers/userController/addAdmin');



//Use the function from controller
router.post('/addUser',addUserController.addUser);


module.exports = router;
