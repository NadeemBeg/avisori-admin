var express = require('express');
var router = express.Router();
const forgot = require("../controllers/login");
/* GET home page. */


// router.get('/forgotPassword', function(req, res, next) {
//   console.log("newPassword get forgot");
//   res.render('newPassword', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  console.log("forgotPassword get 123 forgot");
  res.render('forgotPassword', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log("newPassword post 123 forgot1111111111111111111");
  forgot.otpSend
  // res.render('newPassword', { title: 'Express' });
});

// router.post('/newPassword', function(req, res){
//   res.render('newPassword', { title: 'Express' });
//   console.log("newPassword post1 forgot");
// });

// router.get('/newPassword', function(req, res){
//   console.log("newPassword post forgot");
//   res.render('newPassword', { title: 'Express' });
  
// });


module.exports = router;