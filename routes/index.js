var express = require('express');
var router = express.Router();
const login = require("../controllers/login");
const {verifyAuth} = require('../middleware/auth');
/* GET home page. */
// router.get('/', (req, res) => {
//   console.log("req",req)
//   // res.render('index', { title: 'Express' });
//   res.render('index',{title:"login sucess"}); 
// });
router.get("/",login.homePageData);
router.post("/",login.login);

module.exports = router;
