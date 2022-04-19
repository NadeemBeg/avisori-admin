var express = require('express');
var router = express.Router();
const users = require("../controllers/users");
const {verifyAuth} = require('../middleware/auth');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   console.log("users get 123 forgot");
//   users.allUsers
//   // res.render('users', { title: 'Express' });
// });
router.get('/',verifyAuth,users.allUsers);
router.post('/',verifyAuth,users.saveUsers);
router.get('/edit/:id',verifyAuth,users.editUser);
router.get('/delete/:id',verifyAuth,users.deleteUser);
router.get('/block/:id',verifyAuth,users.blockUser);
router.get('/unblock/:id',verifyAuth,users.unblockUser);
module.exports = router;
