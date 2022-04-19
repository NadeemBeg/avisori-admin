var express = require('express');
var router = express.Router();
const middleware = require("../middleware/auth");
// const {verifyAuth} = require('../middleware/auth');
router.post('/checkPhoneNumber',middleware.checkPhoneNumber);
router.post('/checkEmail',middleware.checkEmail);
router.post('/checkBankId',middleware.checkBankId);

module.exports = router;