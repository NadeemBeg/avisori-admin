var express = require('express');
var router = express.Router();
const forgot = require("../controllers/forgot");
/* GET home page. */


router.get('/', function(req, res, next) {
    console.log("newPassword get create");
    res.render('newPassword', { title: 'Express' });
  });

// router.post('/', function(req, res){
//   console.log("newPassword post create123");
//   forgot.otpSend
// });
router.post('/',forgot.otpSend);

// router.post('/login', function(req, res){
//   console.log("newPassword post create");
//   forgot.otpCheckAndSetNewPassword
//   res.render('login', { title: 'Express' });
// });

module.exports = router;