const express = require('express'); // importing express
const router = express.Router();  // Router call
const homeController = require('../controllers/home_controller')

router.get('/',homeController.home);

module.exports = router ; // exporting router