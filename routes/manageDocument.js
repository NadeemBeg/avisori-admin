var express = require('express');
var router = express.Router();
const manageDocument = require("../controllers/manageDocument");
const {verifyAuth} = require('../middleware/auth');
router.get('/',verifyAuth,manageDocument.showDocuments);
router.get('/create',verifyAuth,manageDocument.manageDocumentCreate);
router.post('/',verifyAuth,manageDocument.addDocument);
router.get('/delete/:id',verifyAuth,manageDocument.manageDocumentDelete);
router.get('/edit/:id',verifyAuth,manageDocument.manageDocumentEdit);

module.exports = router;