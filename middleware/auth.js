const jwt = require('jsonwebtoken');
var PhoneNumberValidator = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const getAddMoreInfo = require("../models/addMoreInfo");
var emailValidator = require("email-validator");
const {isValid} = require('swedish-personal-identity-number-validator');

exports.verifyAuth = async (req, res, next) => {
    try{
        const authorization = req.headers.cookie;
        console.log("authorization",authorization);
        if("token=" == authorization){
            console.log("asdfasdfasd");
            return res.redirect('/');
        }
        const token = authorization.replace('token=', '')
        if(!token){
            res.redirect('/');
            res.status(419).json({
                status: 0 ,
                message: "authorization is required."
            })
        }
        await jwt.verify(token, process.env.SECRET,  function(error, data) {
            if(error){
                res.redirect('/');
                res.status(401).json({message:error, status: 0});
            }
            // console.log(decoded.foo) // bar
            req.user = data.data;
            next();
        });
    }catch(error){
        // res.status(419).json({
        //     status: 0 ,
        //     message: "authorization is failed.",
        //     error
        // })
        var message = "";
        message = "Login Failed";
        res.render('login',{title:"Advisor",message:message});
    }
    
}

exports.checkPhoneNumber = (req, res) =>{
    console.log("Tesign123",req.body);
    var phoneNumber = req.body.phoneNumber;
    if(phoneNumber !== undefined || phoneNumber !== null || phoneNumber !== ""){
        console.log("phoneNumber",phoneNumber);
        var phoneNumberValidation = PhoneNumberValidator.test(phoneNumber);
        console.log("phoneNumberValidation",phoneNumberValidation);
        if(!phoneNumberValidation){
            // return res.json({
            //     status:false,
            //     message:"Please Enter Valid Phone Number."
            // });
            return res.json("Please enter your valid Phone Number.");
        }
        else{
            console.log("Valid");
            return res.json("true")
        }
    }
    phoneNumber= '';
}
exports.checkEmail = (req, res) =>{
    console.log("Tesign123",req.body);
    var email = req.body.email;
    var id = req.body.id;
    var emailValidation = emailValidator.validate(email);
    if(!emailValidation){
        return res.json("Please enter your valid Email.");
        // return res.json("Please Enter Valid Email.");
    }
    if(id !== null && id !== "" && id !== undefined){
        getAddMoreInfo.findOne({_id:id},(err,findEmail)=>{
            if(err){
                return res.json("Please enter your valid Email.");
            }
            else{
                if(findEmail !== null && findEmail !== '' && findEmail !== undefined){
                    if(findEmail.email == email){
                        console.log("Valid");
                        return res.json("true");
                    }
                    else{
                        getAddMoreInfo.find({email:email},(err,emailCheck)=>{
                            if(err){
                                return res.json("Please enter your valid Email.");
                            }
                            else{
                                if(emailCheck.length > 0){
                                    return res.json("Email already Exists.");  
                                }
                                else{
                                    console.log("Valid");
                                    return res.json("true")
                                }
                            }
                        });
                    }
                }
            }
        });
    }
    else{
        getAddMoreInfo.find({email:email},(err,emailCheck)=>{
            if(err){
                return res.json("Please enter your valid Email.");
            }
            else{
                if(emailCheck.length > 0){
                    return res.json("Email already Exists.");  
                }
                else{
                    console.log("Valid");
                    return res.json("true")
                }
            }
        });
    }
}
exports.checkBankId = (req, res) =>{
    console.log("NAdem");
    console.log("Tesign123",req.body);
    var bankId = req.body.bankId;
    if(!isValid(bankId)){
        console.log("In valid");
        return res.json("Please enter your valid SSN Number.");
    }
    else{
        console.log("Valid");
        return res.json("true")
    }
}
