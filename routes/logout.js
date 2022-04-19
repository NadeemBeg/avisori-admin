var express = require('express');
var router = express.Router();
const logout = require("../controllers/logout");
// const {verifyAuth} = require('../middleware/auth');
router.get('/',logout.logout);
module.exports = router;