const getAddMoreInfo = require("../models/addMoreInfo");
exports.pushNotification = (req, res) =>{
    console.log("Tesign1234567890");
    getAddMoreInfo.find((err,data)=>{
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