const getAddMoreInfo = require("../models/addMoreInfo");
const getLanguage = require("../models/language");
const getSubCategory = require("../models/subCategory");
const getCompany = require("../models/company");
var emailValidator = require("email-validator");
var PhoneNumberValidator = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const {isValid} = require('swedish-personal-identity-number-validator');

var multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profilePics')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
})  
const upload = multer({ storage }).any('profilePic');

const getAllLangs = () => {
    return new Promise(function (resolve, reject) {
        getLanguage.find()
        .select("name")
        .exec((err, langs) => {
          resolve(langs);
        });
    });
  };
  
  const getAllCates = () => {
    return new Promise(function (resolve, reject) {
      getSubCategory.find()
        .select("name")
        .exec((err, cates) => {
          resolve(cates);
        });
    });
  };

exports.allAdvisors = async(req, res) =>{
    console.log("Tesign1234567890");
    const langsAll = await getAllLangs();
    const catisAll = await getAllCates();
    let data1 = [];
    getAddMoreInfo.find({advisorType:{$ne:null},isDelete:false}).exec(async(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            data.map(async (user) => {
                let languages = [];
                let categories = [];
                let langs = user.languages;
                let cats = user.speciality;
                langs.map(async (lang) => {
                  langsAll.find((l) => {
                      console.log("LLL",l);
                    if (l._id == lang) {
                      languages.push(l.name);
                    }
                  });
                });
                cats.map(async (cati) => {
                  catisAll.find((c) => {
                    console.log("CCC",c);
                    if (c._id == cati) {
                      categories.push(c.name);
                    }
                  });
                });
                console.log("cats",cats);
                let arr = {
                  _id: user._id,
                  firstName: user.firstName,
                  lastName :user.lastName,
                  advisorType: user.advisorType,
                  profilePic: user.profilePic,
                  speciality: categories,
                  languages: languages,
                  isNewUser:user.isNewUser,
                };
                data1.push(arr);
            });
            res.render('advisors',{title:"login sucess",allusers:data1}); 
        }
    });
};
exports.deleteAdvisor = (req, res) =>{
    console.log("Tesign123",req.params.id);
    var advisorId = req.params.id;
    getAddMoreInfo.findOneAndUpdate({_id:advisorId},{$set:{isDelete:true}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            res.redirect('/advisors')
            
        }
    });
};

exports.blockAdvisor = (req, res) =>{
    console.log("Tesign123",req.params.id);
    var advisorId = req.params.id;
    getAddMoreInfo.findOneAndUpdate({_id:advisorId},{$set:{isNewUser:1}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            res.redirect('/advisors')
            
        }
    });
};
exports.unblockAdvisor = (req, res) =>{
    console.log("Tesign123",req.params.id);
    var advisorId = req.params.id;
    getAddMoreInfo.findOneAndUpdate({_id:advisorId},{$set:{isNewUser:0}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            res.redirect('/advisors')
            
        }
    });
};

exports.advisorEdit = (req, res) =>{
    console.log("Tesign123",req.params.id);
    var advisorId = req.params.id;
    getAddMoreInfo.findOne({_id:advisorId},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            data.set('profilePic','../../uploads/profilePics/'+data.profilePic);
            console.log("categoryBySubCategory",data);
            var userType = 0;
            // if(userType == 1){
            //     userType = "Advisor"
            // }    
            // else{
            //     userType = "Advisor Seeker"
            // }
            var languageDetails;
            var subCategoryDetails;
            var compnayDetails;
            getLanguage.find((err,languageData)=>{
                if(err){
                    console.log("errorr",err);
                    res.json("Wrong Password");
                }
                else{
                    languageDetails = languageData;
                    getSubCategory.find((err,subCategoryData)=>{
                        if(err){
                            console.log("errorr",err);
                            res.json("Wrong Password");
                        }
                        else{
                            subCategoryDetails = subCategoryData;
                            getCompany.find((err,compnayData)=>{
                                if(err){
                                    console.log("errorr",err);
                                    res.json("Wrong Password");
                                }
                                else{
                                    compnayDetails = compnayData;
                                    console.log("languageDetails",languageDetails,"subCategoryDetails",subCategoryDetails);
                                    res.render('advisorsEdit',{title:"Avisor",advisorDetails:data,userType:userType,subCategoryDetails:subCategoryDetails,languageDetails:languageDetails,compnayDetails:compnayDetails}); 
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.advisorCreate = (req, res) =>{
    var data1 = '' ;
    console.log("ASDF");
    var userType = 1;
    var languageDetails = "";
    var subCategoryDetails = "";
    var compnayDetails ="";
    getLanguage.find((err,languageData)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            languageDetails = languageData;
            getSubCategory.find((err,subCategoryData)=>{
                if(err){
                    console.log("errorr",err);
                    res.json("Wrong Password");
                }
                else{
                    subCategoryDetails = subCategoryData;
                    getCompany.find((err,compnayData)=>{
                        if(err){
                            console.log("errorr",err);
                            res.json("Wrong Password");
                        }
                        else{
                            compnayDetails = compnayData;
                            console.log("languageDetails");
                            res.render('advisorsEdit',{title:"Avisor",advisorDetails:data1,userType:userType,subCategoryDetails:subCategoryDetails,languageDetails:languageDetails,compnayDetails:compnayDetails}); 
                        }
                    });
                }
            });
        }
    });
}

exports.saveAdvisor = (req, res) =>{
    upload(req,res,err => {
        console.log("req.bodyreq.bodyreq.body",req.body);
        console.log("req.bodyreq.bodyreq.req",req.files);
        console.log("req.bodyreq.bodyreq.err",req.err);
        if(err){
            return res.json(err);
        }
        else{
            var newUser = new getAddMoreInfo(req.body);
            var advisorId = req.body.id;
            var bankId = req.body.bankId;
            var files = req.files;
            // if(!isValid(bankId)){
            //     res.status(419).json({
            //         status: 0,
            //         message: 'SSN you have provide is invalid.'
            //     });
            // }
            console.log("files ndm",files);
            let originalname = '';
            if(files !== undefined && files !== null && files.length > 0 ){
                originalname = files[0].filename;
                console.log("originalname",originalname);
                if(advisorId !== "" && advisorId !== null){
                    let reqData = {
                         bankId : req.body.bankId,
                         firstName : req.body.firstName,
                         lastName : req.body.lastName,
                         languages : req.body.languages,
                         speciality : req.body.speciality, 
                         companyId : req.body.companyId,
                         advisorType : req.body.advisorType,
                         description : req.body.description,
                         profilePic : originalname
                    };
                    getAddMoreInfo.findOneAndUpdate({_id:advisorId},{$set: reqData},{ new: false, useFindAndModify: false },(err,updateUser)=>{
                        if(err){
                            res.status(400).json({
                                status:0,
                                message: 'Unable to update user',
                                error: err
                            });
                        }
                        else{
                            res.redirect('/advisors');  
                        }
                    });
                }
                else{
                    newUser.set('profilePic',originalname);
                    console.log("newUser",newUser);
                    newUser.save((err,newuser)=>{
                        if(err){
                            console.log("errorr",err);
                            res.json("Wrong Password");
                        }
                        else{
                            res.redirect('/advisors');
                        }
                    });
                }
            }
            else{
                let reqData = {
                    bankId : req.body.bankId,
                    firstName : req.body.firstName,
                    lastName : req.body.lastName,
                    languages : req.body.languages,
                    speciality : req.body.speciality, 
                    companyId : req.body.companyId,
                    advisorType : req.body.advisorType,
                    description : req.body.description,
               };
               getAddMoreInfo.findOneAndUpdate({_id:advisorId},{$set: reqData},{ new: false, useFindAndModify: false },(err,updateUser)=>{
                if(err){
                    res.status(400).json({
                        status:0,
                        message: 'Unable to update user',
                        error: err
                    });
                }
                else{
                    res.redirect('/advisors');  
                }
            });
            }
        }
    });
    
}