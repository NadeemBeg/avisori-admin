var express = require('express');
var router = express.Router();
const notification = require("../controllers/notificationManage");
const {verifyAuth} = require('../middleware/auth');
router.get('/',verifyAuth,notification.pushNotification);

module.exports = router;