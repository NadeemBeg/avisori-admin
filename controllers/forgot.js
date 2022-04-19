const getAdminData = require("../models/admin");
var emailValidator = require("email-validator");
const nodemailer = require('nodemailer');
const Email_detials = require('../config').EMAILS_DETAILS;
var bcrypt = require('bcrypt');
exports.otpSend = (req, res) =>{
    console.log("testing");
    const data = req.body;
    const email = data.email;
    var emailValidation = emailValidator.validate(email);
    if(!emailValidation)
        return res.json("Please Enter Valid Email.");
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);
    console.log("console.log",req.body);
    console.log("Email_detials",Email_detials);
    var smtpTransport = nodemailer.createTransport({
        host : Email_detials.HOST_NAME,
        secureConnection : Email_detials.SECURE_CONNECTION,
        port: Email_detials.PORT,
        auth : {
            user : Email_detials.USER,
            pass : Email_detials.PASSWORD    
        }
    });
    var mailOptionsNoAttachment={
        from: Email_detials.USER,
        to : email,
        subject : "Reset your Admin Avisori password" ,
        text : "You can also log in manually by entering the following OTP"+" "+val
    }
    smtpTransport.sendMail(mailOptionsNoAttachment, function(error, response){
        if(error){
            console.log(error);
            res.json("Email not sent.");
            res.redirect("/forgotPassword");
        }
        else{
            console.log("response",response);   
            getAdminData.findOne((err,dataFind)=>{
                if (err) {
                    return res.status(400).json({
                      error: "Otp not send"
                    });
                }
                else{
                    console.log("dataFind",dataFind);
                    const id =dataFind._id;
                    if(id){
                        getAdminData.findOneAndUpdate({_id:id},{$set:{otp:val}},(err,otpUpdate)=>{
                            if (err) {
                                res.redirect("/forgotPassword"); 
                                return res.status(400).json({
                                  error: "Otp not send1111"
                                });
                            }
                            else{
                                console.log("otpUpdate",otpUpdate);
                                res.redirect("/newPassword"); 
                            }
                        });
                    }
                    else{
                        res.redirect("/forgotPassword"); 
                        res.json("Otp not sent."); 
                    }
                }
            });
        }
    });
};

exports.otpCheckAndSetNewPassword = (req, res) =>{
    const slat = 10
    console.log("otpCheckAndSetNewPassword");
    const data = req.body;
    const otp = data.otp;
    const userName = data.username;
    const newPassword = data.newPassword;
    console.log(otp, userName, newPassword);
    getAdminData.findOne((err,adminData)=>{
        if (err) {
            res.redirect("/forgotPassword"); 
            return res.status(400).json({
              error: "Admin not found"
            });
        }
        else{
            var DBOtp = adminData.otp;
            var DBUserName =adminData.userName;
            var _id = adminData._id;
            console.log("DBOTP",DBOtp, otp);
            if(Number(DBOtp) == Number(otp)){
                if(userName === DBUserName){
                    bcrypt.hash(newPassword,slat,(err,pass)=>{
                        var newpassword = pass;
                        if(err){
                            res.redirect("/forgotPassword");
                            console.log("errorr",err);
                            return res.json(err);
                        }
                        else{
                            var resetOpt = 0;
                            getAdminData.findByIdAndUpdate(_id,{$set:{opt:resetOpt,password:newpassword}},(err,updateData)=>{
                                if(err){
                                    res.redirect("/forgotPassword");
                                    console.log("errorr",err);
                                    return res.json(err);
                                }
                                else{
                                    console.log("updateData",updateData);   
                                    res.redirect("/");
                                } 
                            });
                        }
                    });
                }
                else{
                    // res.render('forgotPassword', {title: 'Express', success: 'not success' });
                    res.redirect("/forgotPassword");
                    console.log("otp match");
                }
            }
            else{
                res.redirect("/forgotPassword");
                console.log("Not otpmacthc");
            }
        }
    })
};