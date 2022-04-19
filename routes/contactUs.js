var express = require('express');
var router = express.Router();
const contact = require("../controllers/contactUs");
const {verifyAuth} = require('../middleware/auth');
router.get('/',verifyAuth,contact.contactDetails);
router.get('/edit/:id',verifyAuth,contact.contactEdit);
router.post('/',verifyAuth,contact.contactSave);
module.exports = router;