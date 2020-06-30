const express = require('express'); // importing express
const router = express.Router();  // Router call
const homeController = require('../controllers/home_controller')

router.get('/',homeController.home);

router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
router.use('/api',require('./api'));


module.exports = router ; // exporting router