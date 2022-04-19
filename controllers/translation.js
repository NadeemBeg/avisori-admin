const getTranslation = require("../models/translation");


exports.translationList = (req, res) =>{
    console.log("Tesign1234567890");
    getTranslation.find({status:1},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",data);
            if(data !== null){
                var data1 =[] ;
                data1 = data;
                res.render('translation',{title:"Advisor",alltranslationList:data1}); 
            }
            
        }
    });
};

exports.translationSave = (req, res) =>{
    console.log("Tesign1234567890",req.body);
    var data = req.body;
    var id = req.body.id;
    var title = req.body.title;
    var english = req.body.english;
    var swedish = req.body.swedish;
    if(id !== null && id !== "" && id !== undefined){
        getTranslation.findOneAndUpdate({_id:id},{$set:{title:title,english:english, swedish:swedish}},(err,updateData)=>{
            if(err){
                console.log("errorr",err);
                res.json("Wrong Password");
            }
            else{
                console.log("updateData",updateData);
                res.redirect('/translation')
            }
        });
    }
    else{
        const newData = new getTranslation(data);
        console.log("newData",newData);
        newData.save((err,saveData)=>{
            if(err){
                console.log("errorr",err);
                res.json("Wrong Password");
            }
            else{
                console.log("saveData",saveData);
                res.redirect('/translation')
            }
        });
    }
}
exports.translationCreate = (req, res) =>{
    var data1 ='';
    res.render('translationEdit',{title:"Advisor",translationDetails:data1}); 
}
exports.translationEdit = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var Id = req.params.id;
    getTranslation.findOne({_id:Id},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("introDataId",data);
            res.render('translationEdit',{title:"Advisor",translationDetails:data}); 
        }
    });
}