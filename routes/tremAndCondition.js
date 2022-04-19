var express = require('express');
var router = express.Router();
const cms = require("../controllers/cms");
const {verifyAuth} = require('../middleware/auth');
router.get('/',verifyAuth,cms.tremAndCondition);
router.get('/edit/:id',verifyAuth,cms.edit);
router.post('/',verifyAuth,cms.save);
module.exports = router;