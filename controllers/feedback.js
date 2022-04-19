const getAddFeedback = require("../models/addFeedback");
const getAddMoreInfo = require("../models/addMoreInfo");
exports.allFeedBack = (req, res) =>{
    console.log("Tesign1234567890");
    getAddFeedback.find((err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",data);
            if(data !== null){
                for(let i = 0; i<data.length; i++ ){
                    var advisorId = data[i].advisorId;
                    var adviceSeekerId =data[i].adviceSeekerId;
                    getAddMoreInfo.find({_id:{$in:[advisorId,adviceSeekerId]}},(err, advisorIdData)=>{
                        if(err){
                            console.log("errorr",err);
                            res.json("Wrong Password");
                        }
                        else{
                            console.log("advisorIdData",i ,advisorIdData);
                        }
                    });
                }
            }
            var data1 =[] ;
            data1 =data;
            res.render('feedback',{title:"login sucess",allFeedBack:data1}); 
        }
    });
};