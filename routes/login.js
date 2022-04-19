var express = require('express');
var router = express.Router();
const forgot = require("../controllers/forgot");
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


router.post("/",forgot.otpCheckAndSetNewPassword);



module.exports = router;
