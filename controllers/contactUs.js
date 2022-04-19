const getContactUs = require("../models/contactUs");
exports.contactDetails = (req, res) =>{
    console.log("Tesign1234567890");
    getContactUs.find((err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",data);
            if(data !== null){
                var data1 =[] ;
                data1 = data;
                res.render('contactUs',{title:"login sucess",contactDetails:data1}); 
            }
            
        }
    });
};


exports.contactEdit = (req, res) =>{
    console.log("Tesign123",req.params);
    var contactId = req.params.id;
    getContactUs.findOne({_id:contactId},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            
            console.log("categoryBySubCategory",data);
            res.render('contactEdit',{title:"login sucess",contactDetails:data}); 
        }
    });
}
exports.contactSave = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var contactId = req.body.id;
    var email = req.body.email;
    var address = req.body.address;
    var mobile = req.body.mobile;
    getContactUs.findOneAndUpdate({_id:contactId},{$set:{email:email,address:address,mobile:mobile}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("categoryBySubCategory",data);
            // res.render('contactUs',{title:"login sucess"}); 
            getContactUs.find((err,data)=>{
                if(err){
                    console.log("errorr",err);
                    res.json("Wrong Password");
                }
                else{
                    console.log("contactDetails",data);
                    if(data !== null){
                        var data1 =[] ;
                        data1 = data;
                        res.render('contactUs',{title:"login sucess",contactDetails:data1}); 
                    }
                    
                }
            });
        }
    });
}