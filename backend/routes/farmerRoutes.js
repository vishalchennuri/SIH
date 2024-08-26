const farmerController = require('../controllers/farmerController');
const express = require('express');

const router = express.Router();

router.post('/register', farmerController.farmerRegister);

router.post('/login', farmerController.farmerLogin);

module.exports = router;
