const express = require('express'); // importing express
const router = express.Router();  // Router call

router.use('/v1',require('./v1'));

module.exports = router;