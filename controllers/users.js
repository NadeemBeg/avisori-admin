const getAddMoreInfo = require("../models/addMoreInfo");
var emailValidator = require("email-validator");
var PhoneNumberValidator = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const {isValid} = require('swedish-personal-identity-number-validator');
exports.allUsers = (req, res) =>{
    console.log("Tesign1234567890");
    getAddMoreInfo.find({advisorType:null,isDelete:false},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            // console.log("allusers",data);
            var data1 =[] ;
            data1 =data;
            res.render('users',{title:"login sucess",allusers:data1}); 
        }
    });
};


exports.editUser = (req, res) =>{
    console.log("Tesign123",req.params.id);
    var userId = req.params.id;
    getAddMoreInfo.findOne({_id:userId},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            
            // console.log("categoryBySubCategory",data);
            // var userType = data.userType;
            // if(userType == 1){
            //     userType = "Advisor"
            // }    
            // else{
            //     userType = "Advisor Seeker"
            // }
            res.render('userEdit',{title:"Advisor",userDetails:data,userType:"Advisor Seeker"}); 
        }
    });
};

exports.deleteUser = (req, res) =>{
    console.log("Tesign123",req.params.id);
    var userId = req.params.id;
    getAddMoreInfo.findOneAndUpdate({_id:userId},{$set:{isDelete:true}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            res.redirect('/users')
            
        }
    });
};

exports.blockUser = (req, res) =>{
    console.log("Tesign123",req.params.id);
    var userId = req.params.id;
    getAddMoreInfo.findOneAndUpdate({_id:userId},{$set:{isNewUser:1}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            res.redirect('/users')
            
        }
    });
};
exports.unblockUser = (req, res) =>{
    console.log("Tesign123",req.params.id);
    var userId = req.params.id;
    getAddMoreInfo.findOneAndUpdate({_id:userId},{$set:{isNewUser:0}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            res.redirect('/users')
            
        }
    });
};


exports.saveUsers = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var userId = req.body.id;
    var email = req.body.email;
    var bankId = req.body.bankId;
    var phoneNumber = req.body.phoneNumber;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName

    if(phoneNumber !== undefined || phoneNumber !== null || phoneNumber !== ""){
        console.log("phoneNumber",phoneNumber);
        var phoneNumberValidation = PhoneNumberValidator.test(phoneNumber);
        console.log("phoneNumberValidation",phoneNumberValidation);
        if(!phoneNumberValidation){
            return res.json({
                status:false,
                message:"Please Enter Valid Phone Number."
            });
        }
    }

    var emailValidation = emailValidator.validate(email);
    if(!emailValidation){
        console.log("ASDFASDFSADF");
        return alert("Please Enter Valid Email.");
        // return res.json("Please Enter Valid Email.");
    }
        
    getAddMoreInfo.findOne({_id:userId},(err,emailfind)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("emailfind",emailfind);
            if(emailfind.email == email){
                if(emailfind !== null && emailfind !== "" &&  emailfind !== undefined){                     
                    getAddMoreInfo.findOneAndUpdate({_id:userId},{$set:{email:email,bankId:bankId,phoneNumber:phoneNumber,firstName:firstName,lastName:lastName}},(err,data)=>{
                        if(err){
                            console.log("errorr",err);
                            res.json("Wrong Password");
                        }
                        else{
                            if(data !== null){
                                res.redirect('/users')
                            }
                            else{
                                console.log("categoryBySubCategory",data);
                                res.render('index',{title:"login sucess"});
                            }
                            
                        }
                    });
                }
                else{
                    console.log("Email Already Exist");
                    // return alert("Email Already Exist");
                }
            }
            else{
                getAddMoreInfo.find({email:email},(err,emailcheck)=>{
                    if(err){
                        console.log("errorr",err);
                        res.json("Wrong Password");
                    }
                    else{
                        console.log("emailcheck",emailcheck.length)
                        if(emailcheck.length > 0){
                            res.redirect('/users');
                            // return res.json("Email Already Exist");
                        }
                        else{
                            getAddMoreInfo.findOneAndUpdate({_id:userId},{$set:{email:email,bankId:bankId,phoneNumber:phoneNumber,firstName:firstName,lastName:lastName}},(err,data)=>{
                                if(err){
                                    console.log("errorr",err);
                                    res.json("Wrong Password");
                                }
                                else{
                                    if(data !== null){
                                        res.redirect('/users')
                                    }
                                    else{
                                        console.log("categoryBySubCategory",data);
                                        res.render('index',{title:"login sucess"});
                                    }
                                    
                                }
                            });
                        }
                    }
                });
            } 
        }
    });
    
}
