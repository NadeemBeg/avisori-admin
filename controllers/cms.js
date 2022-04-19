const getCms = require("../models/cms");
// exports.tremAndCondition = (req, res) =>{
//     console.log("Tesign1234567890");
//     getCms.find({type:'About'},(err,data)=>{
//         if(err){
//             console.log("errorr",err);
//             res.json("Wrong Password");
//         }
//         else{
//             console.log("allusers",data);
//             res.render('cms',{title:"login sucess",tremAndCondition:data}); 
//         }
//     });
// };
exports.tremAndCondition = (req, res) =>{
    console.log("Tesign1234567890");
    getCms.findOne({type:'Terms And Condition'},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",data);
            res.render('tremAndCondition',{title:"login sucess",cms:data}); 
        }
    });
};
exports.about = (req, res) =>{
    console.log("Tesign1234567890");
    getCms.findOne({type:'About'},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",data);
            res.render('about',{title:"login sucess",cms:data}); 
        }
    });
};
exports.edit = (req, res) =>{
    console.log("Tesign1234567890",req.params);
    var id = req.params.id;
    getCms.findOne({_id:id},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",data);
            if(data.type == "About"){
                res.render('aboutEdit',{title:"login sucess",cmsEditData:data}); 
            }
            if(data.type == "Terms And Condition"){
                res.render('tremAndConditionEdit',{title:"login sucess",cmsEditData:data}); 
            }
            
        }
    });
};
exports.save = (req, res) =>{
    console.log("Tesign1234567890",req.body);
    var id = req.body.id;
    var description = req.body.description;
    var swedishDescription = req.body.swedishDescription;
    getCms.findOneAndUpdate({_id:id},{$set:{description:description,swedishDescription:swedishDescription}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",data);

            getCms.findOne({type:data.type},(err,data)=>{
                if(err){
                    console.log("errorr",err);
                    res.json("Wrong Password");
                }
                else{
                    // console.log("allusers",data);
                    if(data.type == "About"){
                        res.render('about',{title:"login sucess",cms:data}); 
                    }
                    if(data.type == "Terms And Condition"){
                        res.render('tremAndCondition',{title:"login sucess",cms:data}); 
                    }
                }
            });

            
        }
    });
};