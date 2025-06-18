const express = require('express');
const { registerController, loginController } = require('../controllers/authController');

const router = express.Router(); // Correctly create a new router instance

// Routes
// REGISTER
router.post('/register', registerController);

// LOGIN || POST
router.post('/login',loginController);
 

module.exports = router; // Correctly export the router
  