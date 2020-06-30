const express = require('express'); // importing express
const router = express.Router();  // Router call
const likesController = require('../controllers/likes_controller')

router.post('/toggle',likesController.toggleLike);

module.exports = router;