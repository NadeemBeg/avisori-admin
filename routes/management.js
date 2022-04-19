var express = require('express');
var router = express.Router();
const management = require("../controllers/management");
const {verifyAuth} = require('../middleware/auth');
router.get('/',verifyAuth,management.AdvisorTypeList);
router.get('/edit/:id',verifyAuth,management.managementEdit);
router.post('/',verifyAuth,management.managementSave);
router.get('/delete/:id',verifyAuth,management.managementDelete);
router.get('/create',verifyAuth,management.managementCreate);

module.exports = router;