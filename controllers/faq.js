const getFaq = require("../models/faq");
exports.faqList = (req, res) =>{
    console.log("Tesign1234567890");
    getFaq.find({status:1},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",data);
            if(data !== null){
                var data1 =[] ;
                data1 = data;
                res.render('faqList',{title:"login sucess",allFaqList:data1}); 
            }
            
        }
    });
};
exports.faqEdit = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var Id = req.params.id;
    getFaq.findOne({_id:Id},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            var language = data.language;
            console.log("introDataId",data);
            res.render('faqEdit',{title:"login sucess",faqDetails:data,language:language}); 
        }
    });
}

exports.faqSave = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var Id = req.body.id;
    var title = req.body.title;
    var description = req.body.description;
    var languageName = req.body.languageName;
    if(Id == "" || Id == null){
        const queAnsData = new getFaq(req.body);
        queAnsData.save((err,data)=>{
            if(err){
                return res.status(400).json({
                    err: "NOT able to save user in DB"
                });
            }
            else{
                res.redirect('/faq');
            }
        });
    }
    else{
        getFaq.findOneAndUpdate({_id:Id},{$set:{title:title,description:description,language:languageName}},(err,data)=>{
            if(err){
                console.log("errorr",err);
                res.json("Wrong Password");
            }
            else{
                if(data !== null){
                    getFaq.find({status:1},(err,data)=>{
                        if(err){
                            console.log("errorr",err);
                            res.json("Wrong Password");
                        }
                        else{
                            // console.log("allusers",data);
                            var data1 =[] ;
                            data1 =data;
                            res.render('faqList',{title:"login sucess",allFaqList:data1}); 
                        }
                    });
                }
                console.log("categoryBySubCategory",data);
                // res.render('category',{title:"login sucess"}); 
            }
        });
    }
}
exports.faqDelete = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var Id = req.params.id;
    getFaq.findOneAndUpdate({_id:Id},{$set:{status:0}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            if(data !== null){
                getFaq.find({status:1},(err,data)=>{
                    if(err){
                        console.log("errorr",err);
                        res.json("Wrong Password");
                    }
                    else{
                        // console.log("allusers",data);
                        var data1 =[] ;
                        data1 =data;
                        res.redirect("/faq");
                        // res.render('faqList',{title:"login sucess",allFaqList:data1}); 
                    }
                });
            }
            console.log("categoryBySubCategory",data);
            // res.render('category',{title:"login sucess"}); 
        }
    });
}

exports.faqCreate = (req, res) =>{
    var data1 =[] ;
    var language=""
    res.render('faqEdit',{title:"login sucess",faqDetails:data1,language:language}); 
}