const getAdvisorType = require("../models/advisorType");

exports.AdvisorTypeList = (req, res) =>{
    console.log("Tesign1234567890");
    getAdvisorType.find({isDelete:false},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",data);
            if(data !== null){
                var data1 =[] ;
                data1 = data;
                res.render('management',{title:"login sucess",AdvisorTypeList:data1}); 
            }
        }
    });
};
exports.managementEdit = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var Id = req.params.id;
    getAdvisorType.findOne({_id:Id},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            
            console.log("introDataId",data);
            res.render('managementEdit',{title:"login sucess",AdvisorTypeDetails:data}); 
        }
    });
}
exports.managementCreate = (req, res) =>{
    var data1 ='';
    res.render('managementEdit',{title:"login sucess",AdvisorTypeDetails:data1}); 
}

exports.managementSave = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var Id = req.body.id;
    var title = req.body.title;
    if(Id == "" || Id == null){
        const managementData = new getAdvisorType(req.body);
        managementData.save((err,data)=>{
            if(err){
                return res.status(400).json({
                    err: "NOT able to save user in DB"
                });
            }
            else{
                res.redirect('/management');
            }
        });
    }
    else{
        getAdvisorType.findOneAndUpdate({_id:Id},{$set:{title:title}},(err,data)=>{
            if(err){
                console.log("errorr",err);
                res.json("Wrong Password");
            }
            else{
                res.redirect('/management');
            }
        });
    }
}

exports.managementDelete = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var Id = req.params.id;
    getAdvisorType.findOneAndUpdate({_id:Id},{$set:{isDelete:true}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            res.redirect("/management");
        }
    });
}