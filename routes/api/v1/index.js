const express = require('express'); // importing express
const router = express.Router();  // Router call

router.use('/posts',require('./posts'));
router.use('/users',require('./users'));


module.exports = router