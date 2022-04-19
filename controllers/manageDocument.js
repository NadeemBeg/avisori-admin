const getManageDocument = require("../models/manageDocument");
var multer  = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log("req.bodyreq.bodyreq.body1222222",req.body);
        cb(null, "./uploads/manageDocuments");
    },
    filename: (req, file, cb) => {
        
        console.log("req.bodyreq.bodyreq.body12",req.body);
        // var orderId = req.body.orderId;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+'.pdf')

        // cb(null, file.originalname.replace(/ /g, ""))
        // var extensionsGet = file.originalname;
        // if(file){
        //     cb(null, (new Date()).getTime()+file.originalname);//png
        // }
    }
});

const upload = multer({storage: storage}).any('manageDocument');


exports.showDocuments = (req, res) =>{
    console.log("Tesign1234567890");
    getManageDocument.find({isDelete:false},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers1111",data);
            if(data !== null){
                var data1 =[] ;
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
                data1 = data;
                res.render('manageDocument',{title:"login sucess",documentDetails:data1}); 
            }
        }
    });
};

exports.manageDocumentCreate = (req, res) =>{
    var data1 =[] ;
    res.render('manageDocumentEdit',{title:"login sucess",manageDocumentDetails:data1}); 
}
exports.manageDocumentDelete = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var id = req.params.id;
    getManageDocument.findOneAndUpdate({_id:id},{$set:{isDelete:true}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("data",data);
            res.redirect("/manageDocument");
        }
    });
}

exports.manageDocumentEdit = (req, res) =>{
    console.log("Tesign123",req.params);
    console.log("Tesign123",req.body);
    var introDataId = req.params.id;
    getManageDocument.findOne({_id:introDataId},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{   
                // var image = data.image;
                // image = image.split('com/');
                // image = '../../'+image[1];   
                // data.set('image',image);
            res.render('manageDocumentEdit',{title:"login sucess",manageDocumentDetails:data}); 
        }
    });
}

exports.addDocument = (req,res)=>{
    var finalDocument = new getManageDocument();
    upload(req,res,err => {
        console.log("req.bodyreq.bodyreq.body",req.body);
        console.log("req.bodyreq.bodyreq.req",req.file);
        console.log("req.bodyreq.bodyreq.err",req.err);
        var id = req.body.id;
        var title = req.body.title;
        var type = req.body.type;
        var originalname = "";
        if(err){
            return res.json({
                status:0,
                message:err});
        }
        else{
            var files = req.files;
            console.log("files",files);
            if(files !== undefined && files !== null){
                if(files.length > 0){
                    for(let i =0; i<files.length; i++){
                        originalname = files[0].filename;
                    }
                    console.log("originalname",originalname);
                    finalDocument.set({
                        "title":title,
                        "type":type,
                        "document":originalname
                    });
                    if(id !== null && id !== ""){
                        console.log("IDIDI",id);
                        getManageDocument.findOneAndUpdate({_id:id},{$set:{title:title,type:type,document:originalname}},(err,updateData)=>{
                            if(err){
                                console.log("errorr",err);
                                res.json("Wrong Password");
                            }
                            else{
                                res.redirect('/manageDocument');
                            }
                            
                        });
                    }
                    else{
                        finalDocument.save((err,data)=>{
                            if(err){
                                console.log("3",err)
                                return res.status(400).json({
                                    "status": false,
                                    "message": "Message not Found."
                                });
                            }
                            else{
                                res.redirect('/manageDocument');
                            }
                        });
                    }
                }
                else{
                    getManageDocument.findOneAndUpdate({_id:id},{$set:{title:title,type:type}},(err,updateData)=>{
                        if(err){
                            console.log("errorr",err);
                            res.json("Wrong Password");
                        }
                        else{
                            res.redirect('/manageDocument');
                        }
                        
                    });
                }
                
            }
        }
    });
}