require("dotenv").config();

const mongoose = require("mongoose");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const bodyParser = require("body-parser");



var login = require('./routes/login');
var index = require('./routes/index');
var forgotPassword = require('./routes/forgotPassword');
var createPassword = require('./routes/createPassword');
var users = require('./routes/users');
var advisors = require('./routes/advisors');
var category = require('./routes/category');
var admin = require('./routes/admin');
var notificationManage = require('./routes/notificationManage');
var feedback = require('./routes/feedback');
var contactUs = require('./routes/contactUs');
var introData = require('./routes/introData');
var faq = require('./routes/faq');
var tremAndCondition = require('./routes/tremAndCondition');
var about = require('./routes/about');
var document = require('./routes/manageDocument');
var companies = require('./routes/companies');
var logout = require('./routes/logout');
var management = require('./routes/management');
var translation = require('./routes/translation');
// for meddleware
var middleware = require('./routes/middleware')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
  


//DB Connection mongoose.createConnection()
mongoose
  .connect("mongodb+srv://nadeem_beg:%23JsDepart@cluster0.49igw.mongodb.net/avisori-backend?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(cookieParser());

//My Routes
app.use('/', login);
app.use('/home', index);
app.use('/forgotPassword',forgotPassword);
app.use('/newPassword',createPassword);
app.use('/users',users);
app.use('/advisors',advisors);
app.use('/category',category);
app.use('/admin',admin);
app.use('/notificationManage',notificationManage);
app.use('/feedback',feedback);
app.use('/contactUs',contactUs);
app.use('/introData',introData);
app.use('/tremAndCondition',tremAndCondition);
app.use('/about',about);
app.use('/faq',faq);
app.use('/manageDocument',document);
app.use('/companies',companies);
app.use('/logout',logout);
app.use('/management',management);
app.use('/middleware',middleware);
app.use('/translation',translation);

app.use('/uploads/images', express.static('uploads/images'));
app.use('/uploads/documents', express.static('uploads/documents')); 
app.use('/uploads/companyLogo', express.static('uploads/companyLogo')); 
app.use('/uploads/categoryIcons', express.static('uploads/categoryIcons')); 
app.use('/uploads/manageDocuments', express.static('uploads/manageDocuments')); 
app.use('/uploads/profilePics', express.static('uploads/profilePics')); 

// catch 404 and forward to error handler
app.use(function(req, res, err, next) {
  // console.log("next",err);
  next(createError(404));
});

// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(process.env.PORT || 8000, () => {
  console.log(`app is running at`,port);
});

// module.exports = app;
