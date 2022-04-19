const getAddMoreInfo = require("../models/addMoreInfo");
const getAdminData = require("../models/admin");
// const getCategory = require("../models/category");
var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
let totalUsers = 0;
let totalCategories = 0;
let totalAdvisors = 0;
//login api
exports.login = (req, res) =>{
    var data = req.body;
    console.log("data",data);
    var password = data.password;
    totalUsers = 0;
    totalCategories = 0;
    totalAdvisors = 0;
    getAdminData.findOne((err,findata)=>{
        if(err){
            console.log("errorr",err);
            res.json("Password");
        }
        else{
            console.log("findata",findata);
            const token = jwt.sign({ data: findata }, process.env.SECRET);
            //put token in cookie
            res.cookie("token", token, { expire: new Date() + 9999 });
            console.log("a",token);
            var hashPass = findata.password;
            bcrypt.compare(password,hashPass,(err,pass)=>{
                if(err){
                    console.log("errorr",err);
                    return res.json(err);
                }
                else{
                    console.log(pass);
                    if(pass){
                        getAddMoreInfo.aggregate(
                            [
                                // Stage 1
                                {
                                    $group: {
                                        _id: null,
                                        Total: {
                                            $sum: 0
                                        },
                                        docs: {
                                            $push: '$$ROOT'
                                        }
                                    }
                                },
                        
                                // Stage 2
                                {
                                    $project: {
                                        _id: 0,
                                        Total:1,
                                        Released: {
                                            $filter: {
                                                input: "$docs",
                                                as: "doc",
                                                cond: { 
                                                    $ne: ["$$doc.advisorType", null]
                                                }
                                            }
                                        },
                                        Unreleased: {
                                            $filter: {
                                                input: "$docs",
                                                as: "doc",
                                                cond: {
                                                    $eq: ["$$doc.advisorType", null]
                                                }
                                            }
                                        },
                                    }
                                },
                        
                                // Stage 3
                                {
                                    $project: {
                                        Total: 1,
                                        Released: {
                                            $size: '$Released'
                                        },
                                        UnReleased: {
                                            $size: '$Unreleased'
                                        }
                                    }
                                },
                        
                            ],(err,data)=>{
                                console.log("data",data);
                                totalAdvisors = data[0].UnReleased;
                                totalUsers = data[0].Released;
                                res.render('index',{title:"login sucess",totalUsers:totalUsers,totalAdvisors:totalAdvisors,totalCategories:totalCategories});
                            }
                        );
                                 // getAddMoreInfo.count({advisorType:{$ne:null},isDelete:false},(err,advisorCount)=>{
                        //     if(err){
                        //         console.log("errorr",err);
                        //         res.render('index',{title:"login sucess",totalUsers:totalUsers,totalAdvisors:totalAdvisors,totalCategories:totalCategories});
                        //         return res.json(err);
                        //     }
                        //     else{
                        //         totalAdvisors = advisorCount;
                        //         console.log("data",data);
                        //         getAddMoreInfo.count({advisorType:null,isDelete:false},(err,userCount)=>{
                        //             if(err){
                        //                 console.log("errorr",err);
                        //                 res.render('index',{title:"login sucess",totalUsers:totalUsers,totalAdvisors:totalAdvisors,totalCategories:totalCategories});
                        //                 return res.json(err);
                        //             }
                        //             else{
                        //                 totalUsers = userCount;
                        //                 res.render('index',{title:"login sucess",totalUsers:totalUsers,totalAdvisors:totalAdvisors,totalCategories:totalCategories});
                        //                 // getCategory.find((err,Categorydata)=>{
                        //                 //     if(err){
                        //                 //         console.log("errorr",err);
                        //                 //         res.render('index',{title:"login sucess",totalUsers:totalUsers,totalAdvisors:totalAdvisors,totalCategories:totalCategories});
                        //                 //         return res.json(err);
                        //                 //     }
                        //                 //     else{
                        //                 //         totalCategories = Categorydata.length;
                        //                 //         res.render('index',{title:"login sucess",totalUsers:totalUsers,totalAdvisors:totalAdvisors,totalCategories:totalCategories});
                        //                 //     }
                        //                 // });
                        //             }
                        //         });
                        //     }
                        // });                
                    }
                    else{
                        // res.render('login',{title:"login"});
                        res.redirect("/"); 
                    }
                }
            });
        }
    });
}


exports.homePageData = (req, res) =>{
    
    res.render('index',{title:"Advisor",totalUsers:totalUsers,totalAdvisors:totalAdvisors,totalCategories:totalCategories});
}

// Register Api

// exports.login = (req, res) =>{
//     const adminCollection = new getAdminData();
//     const slat = 10
//     var data = req.body;
//     var username =  data.username;
//     var password = data.password;
//     console.log(data.username);

//     bcrypt.hash(password,slat,(err,pass)=>{
//         if(err){
//             console.log("errorr",err);
//             return res.json(err);
//         }
//         else{
//             console.log("password",pass);
//             password = pass;
//             adminCollection.userName = username;
//             adminCollection.password = password;
//             adminCollection.save((err,saveData)=>{
//                 if(err){
//                     console.log("errrr",err);
//                     res.render('login',{title:"login sucess"});   
//                 }
//                 else{
//                     console.log("saveData",saveData);
//                     res.render('index',{title:"login sucess"});   
//                 }
//             });
            
//         }
//     });
// }