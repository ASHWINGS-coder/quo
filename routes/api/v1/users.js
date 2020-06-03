const express = require('express'); // importing express
const router = express.Router();  // Router call
const usersApi = require('../../../controllers/api/v1/users_api')
router.post('/create-session',usersApi.createSession);

module.exports = router;