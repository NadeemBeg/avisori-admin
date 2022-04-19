const getAdminData = require("../models/admin");
exports.allAdmin = (req, res) =>{
    getAdminData.find((err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",data);
            var data1 =[] ;
            data1 =data;
            res.render('admin',{title:"login sucess",allAdmin:data1}); 
        }
    });
};