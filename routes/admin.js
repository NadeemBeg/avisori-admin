var express = require('express');
var router = express.Router();
const admin = require("../controllers/adminManage");
const {verifyAuth} = require('../middleware/auth');
router.get('/',verifyAuth,admin.allAdmin);

module.exports = router;