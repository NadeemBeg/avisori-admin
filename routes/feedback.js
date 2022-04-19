var express = require('express');
var router = express.Router();
const feedback = require("../controllers/feedback");
const {verifyAuth} = require('../middleware/auth');
router.get('/',verifyAuth,feedback.allFeedBack);

module.exports = router;