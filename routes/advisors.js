var express = require('express');
var router = express.Router();
const advisors = require("../controllers/advisors");
const {verifyAuth} = require('../middleware/auth');
router.get('/',verifyAuth,advisors.allAdvisors);
router.post('/',verifyAuth,advisors.saveAdvisor);
router.get('/edit/:id',verifyAuth,advisors.advisorEdit);
router.get('/delete/:id',verifyAuth,advisors.deleteAdvisor);
router.get('/block/:id',verifyAuth,advisors.blockAdvisor);
router.get('/unblock/:id',verifyAuth,advisors.unblockAdvisor);
router.get('/create',verifyAuth,advisors.advisorCreate);
// router.get('/create',verifyAuth,advisors.advisorCreate);

module.exports = router;