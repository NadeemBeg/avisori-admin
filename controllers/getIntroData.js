const getIntroData = require("../models/getIntroData");
var multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("req.bodyreq.bodyreq.body1222222",req.body);
        cb(null, "./uploads/images");
    },
    // filename: (req, file, cb) => {
        
    //     console.log("req.bodyreq.bodyreq.body12",req.body);
    //     // var orderId = req.body.orderId;
    //     cb(null, file.originalname.replace(/ /g, ""))
    //     // var extensionsGet = file.originalname;
    //     // if(file){
    //     //     cb(null, (new Date()).getTime()+file.originalname);//png
    //     // }
    // }
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
});

const upload = multer({storage: storage}).single('introImage');

exports.introDataDetails = (req, res) =>{
    console.log("Tesign1234567890");
    getIntroData.find({isDelete:false},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers1111",data);
            if(data !== null){
                res.render('introData',{title:"login sucess",introDataDetails:data}); 
            }
            else{
                res.redirect('/home');
            }
        }
    });
};

exports.introDataEdit = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var introDataId = req.params.id;
    getIntroData.findOne({_id:introDataId},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{   
            var language = data.language;
            var image = data.image;
            image = '../../uploads/images/'+image;   
            data.set('image',image);
            res.render('introDataEdit',{title:"login sucess",introDataDetails:data,language:language}); 
        }
    });
}
exports.introDataDelete = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var id = req.params.id;
    getIntroData.findOneAndUpdate({_id:id},{$set:{isDelete:true}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("data",data);
            res.redirect("/introData");
        }
    });
}
exports.introDataCreate = (req, res) =>{
    var data1 =[] ;
    var language = "";
    res.render('introDataEdit',{title:"login sucess",introDataDetails:data1,language:language}); 
}
exports.introDataSave = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    

    upload(req,res,err => {
        console.log("req.bodyreq.bodyreq.body",req.body);
        console.log("req.bodyreq.bodyreq.req",req.files);
        console.log("req.bodyreq.bodyreq.err",req.err);
        var id = req.body.id;
        var title = req.body.title;
        var description = req.body.description;
        var language = req.body.languageName;
        var originalname = "";
        if(err){
            return res.json(err);
        }
        else{
            var files = req.file;
            console.log("files ndm",files);
            if(files !== undefined && files !== null){
                console.log("1")
                // originalname = files.originalname;
                // originalname = originalname.replace(/ /g, "");
                originalname = files.filename;
                console.log("originalname",originalname);
                if(id == "" || id == null){
                    console.log("2")
                    var createNew = new getIntroData();
                    console.log("createNew",createNew);
                    createNew.set({
                        "title":title,
                        "description":description,
                        "image":originalname
                    });
                    console.log("createNew",createNew);
                    createNew.save((err,data)=>{
                        if(err){
                            console.log("3",err)
                            return res.status(400).json({
                                "status": false,
                                "message": "Message not Found."
                            });
                        }
                        else{
                            getIntroData.find({isDelete:false},(err,data)=>{
                                if(err){
                                    console.log("errorr",err);
                                    res.json("Wrong Password");
                                }
                                else{
                                    console.log("allusers",data);
                                    if(data !== null){
                                        res.redirect('/introData');
                                        // var data1 =[] ;
                                        // for(let i=0; i< data.length; i++){
                                        //     var image = data[i].image;
                                        //     image = image.split('com/');
                                        //     image = image[1];
                                        //     data1.push({
                                        //         _id:data[i]._id,
                                        //         image:image,
                                        //         title:data[i].title,
                                        //         description:data[i].description
                                        //     });
                                        // }
                                        // res.render('introData',{title:"login sucess",introDataDetails:data1}); 
                                    }
                                }
                            });
                        }
                    });
                }
                else{
                    console.log("4")
                    getIntroData.findByIdAndUpdate({_id:id},{$set:{title:title,description:description,language:language,image:originalname}},(err,data)=>{
                        if(err){
                            console.log("errorr",err);
                            res.json("Wrong Password");
                        }
                        else{
                            console.log("5")
                            console.log("introdata",data);
                            getIntroData.find({isDelete:false},(err,data)=>{
                                if(err){
                                    console.log("errorr",err);
                                    res.json("Wrong Password");
                                }
                                else{
                                    console.log("allusers",data);
                                    if(data !== null){
                                        res.redirect('/introData');
                                        // var data1 =[] ;
                                        // for(let i=0; i< data.length; i++){
                                        //     var image = data[i].image;
                                        //     image = image.split('com/');
                                        //     image = image[1];
                                        //     data1.push({
                                        //         _id:data[i]._id,
                                        //         image:image,
                                        //         title:data[i].title,
                                        //         description:data[i].description
                                        //     });
                                        // }
                                        // res.render('introData',{title:"login sucess",introDataDetails:data1}); 
                                    }
                                }
                            });
                        }
                    });
                }
            }
            else{
                console.log("6")
                if(id == "" || id == null){
                    var createNew = new getIntroData();
                    createNew.set({
                        "title":title,
                        "description":description,
                    });
                    createNew.save((err,data)=>{
                        if(err){
                            console.log("7",err)
                            return res.status(400).json({
                                "status": false,
                                "message": "Message not Found."
                            });
                        }
                        else{
                            getIntroData.find({isDelete:false},(err,data)=>{
                                if(err){
                                    console.log("errorr",err);
                                    res.json("Wrong Password");
                                }
                                else{
                                    console.log("allusers",data);
                                    if(data !== null){
                                        // var data1 =[] ;
                                        // for(let i=0; i< data.length; i++){
                                        //     var image = data[i].image;
                                        //     image = image.split('com/');
                                        //     image = image[1];
                                        //     data1.push({
                                        //         _id:data[i]._id,
                                        //         image:image,
                                        //         title:data[i].title,
                                        //         description:data[i].description
                                        //     });
                                        // }
                                        // res.render('introData',{title:"login sucess",introDataDetails:data1}); 
                                        res.redirect('/introData');
                                    }
                                }
                            });
                        }
                    });
                }
                else{
                    getIntroData.findByIdAndUpdate({_id:id},{$set:{title:title,language:language,description:description}},(err,data)=>{
                        if(err){
                            console.log("errorr",err);
                            res.json("Wrong Password");
                        }
                        else{
                            getIntroData.find({isDelete:false},(err,data)=>{
                                if(err){
                                    console.log("errorr",err);
                                    res.json("Wrong Password");
                                }
                                else{
                                    console.log("allusers",data);
                                    if(data !== null){
                                        // var data1 =[] ;
                                        // for(let i=0; i< data.length; i++){
                                        //     var image = data[i].image;
                                        //     image = image.split('com/');
                                        //     image = image[1];
                                        //     data1.push({
                                        //         _id:data[i]._id,
                                        //         image:image,
                                        //         title:data[i].title,
                                        //         description:data[i].description
                                        //     });
                                        // }
                                        // res.render('introData',{title:"login sucess",introDataDetails:data1}); 
                                        res.redirect('/introData');
                                    }
                                }
                            });
                        }
                    });
                }
            }
        }
    });
}

