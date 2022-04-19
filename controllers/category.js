const getCategory = require("../models/category");
const getSubCategory = require("../models/subCategory");
var multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("req.bodyreq.bodyreq.body1222222",req.body);
        cb(null, "./uploads/categoryIcons");
    },
    // filename: (req, file, cb) => {
    //     console.log("req.bodyreq.bodyreq.body12",req.body);
    //     cb(null, file.originalname.replace(/ /g, ""));
    // }
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
});

const upload = multer({storage: storage}).single('categoryImg');

exports.allCategory = (req, res) =>{
    console.log("Tesign1234567890");
    getCategory.find({parentId:{$in:null}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            // console.log("allusers",data);
            // var data1 =[] ;
            // for(let i=0; i< data.length; i++){
            //     var image = data[i].image;
            //     image = image.split('com/');
            //     image = image[1];
            //     data1.push({
            //         _id:data[i]._id,
            //         categoryId :data[i].categoryId,
            //         swedishName: data[i].swedishName,
            //         title:data[i].title,
            //         image:image,
            //     });
            // }
            res.render('category',{title:"login sucess",allcategory:data}); 
        }
    });
};

exports.categoryBySubCategory = (req, res) =>{
    console.log("Tesign1234567890",req.params);
    var categoryId = req.params.id;

    getCategory.findOne({_id:categoryId},(err,cetegoryData)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            var categoryName = cetegoryData.title;
            getCategory.find({parentId:categoryId,isDelete:false},(err,data)=>{
                if(err){
                    console.log("errorr",err);
                    res.json("Wrong Password");
                }
                else{
                    
                    console.log("categoryBySubCategory",data);
                    var data1 =[] ;
                    data1 =data;
                    res.render('subCategory',{title:"login sucess",subCategory:data1,categoryId:categoryId,categoryName:categoryName}); 
                }
            });
        }        
    });
};

exports.categoryEdit = (req, res) =>{
    console.log("Tesign123",req.params);
    var categoryId = req.params.id;
    getCategory.findOne({_id:categoryId},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            getCategory.find({isDelete:false,'_id':{$nin:[categoryId]},parentId:{$in:null}},(err,allCategory)=>{
                if(err){
                    console.log("errorr",err);
                    res.json("Wrong Password");
                } 
                else{
                    console.log("categoryBySubCategory",data);
                    res.render('categoryEditPage',{title:"login sucess",categoryDetails:data,allCategory:allCategory}); 
                }
            });
        }
    });
}
exports.categoryCreate = (req, res) =>{
    console.log("AD");
    var data= "";
    getCategory.find({isDelete:false,parentId:{$in:null}},(err,allCategory)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        } 
        else{
            console.log("categoryBySubCategory",data);
            res.render('categoryEditPage',{title:"login sucess",categoryDetails:data,allCategory:allCategory}); 
        }
    });
}



exports.categorySave = (req, res) =>{
    // console.log("Tesign123",req.params);
    // console.log("Tesign123",req.body);
    upload(req,res,err => {
        var originalname ='';
        console.log("req.bodyreq.bodyreq.body",req.body);
        console.log("req.bodyreq.bodyreq.file",req.file);
        console.log("req.bodyreq.bodyreq.err",req.err);
        var id = req.body.id;
        var categoryId = req.body.categoryId;
        var categoryName = req.body.title;
        var swedishName = req.body.swedishName;
        var mainCategoryId = req.body.mainCategoryId;
        if(err){
            return res.json(err);
        }
        else{
            var files = req.file;
            console.log("files ndm",files);
            if(files !== undefined && files !== null){
                originalname = files.filename;
                if(mainCategoryId !== "" && mainCategoryId !== null && mainCategoryId !== undefined){
                    if(categoryId !== null && categoryId !== undefined && categoryId !==""){
                        
                    }
                    else{
                        var newSubCategory = new getCategory(req.body);
                        newSubCategory.set('image',originalname);
                        newSubCategory.set('parentId',mainCategoryId);
                        console.log("newSubCategory",newSubCategory);
                        newSubCategory.save((err,newSubCategoryAdd)=>{
                            if(err){
                                return res.json(err);
                            }
                            else{
                                res.redirect('/category')
                            }
                        })
                    }
                }
                else{
                    if(categoryId !== null && categoryId !== undefined && categoryId !==""){
                        getCategory.findOneAndUpdate({_id:id},{$set:{title:categoryName,swedishName:swedishName,image:originalname}},(err,updateCategory)=>{
                            if(err){
                                return res.json(err);
                            }
                            else{
                                res.redirect('/category')
                            }
                        });
                    }
                    else{
                        var newCategoryData = new getCategory(req.body);
                        console.log("newCategoryData",newCategoryData);
                        newCategoryData.set('image',originalname);
                        getCategory.count((err,countVal)=>{
                            console.log("countVal",countVal);
                            newCategoryData.set('categoryId',countVal+1);
                            console.log("newCategoryData",newCategoryData);
                            newCategoryData.save((err,newCategory)=>{
                                if(err){
                                    return res.json(err);
                                }
                                else{
                                    res.redirect('/category')
                                }
                            })
                        })
                    }
                }
            }
            else{
                getCategory.findOneAndUpdate({_id:id},{$set:{title:categoryName,swedishName:swedishName}},(err,updateCategory)=>{
                    if(err){
                        return res.json(err);
                    }
                    else{
                        res.redirect('/category')
                    }
                });
            }

        }
    });
    
}
exports.subCategoryEdit = (req, res) =>{
    console.log("Tesign123",req.params);
    var subcategoryId = req.params.id;
    getSubCategory.findOne({_id:subcategoryId},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            data.set('image',"../../uploads/categoryIcons/"+data.image)
            console.log("categoryBySubCategory",data);
            res.render('subcategoryEdit',{title:"Avisori",subCategoryDetails:data}); 
        }
    });
}
exports.subCategoryAdd = (req, res) =>{
    var categoryId = req.params.id;
    console.log("categoryId",categoryId);
    var data = {
        categoryId:categoryId
    }
    res.render('subcategoryEdit',{title:"Avisori",subCategoryDetails:data}); 
}

exports.subcategoryDelete = (req, res) =>{
    console.log("Tesign123",req.params.id);
    var subCategoryId = req.params.id;
    getSubCategory.findOneAndUpdate({_id:subCategoryId},{$set:{isDelete:true}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("data",data);
            var categoryId = data.categoryId;
            res.redirect('/category/'+categoryId);
        }
    });
};

exports.subCategorySave = (req, res) =>{
    upload(req,res,err => {
        console.log("req.bodyreq.bodyreq.body",req.body);
        console.log("req.bodyreq.bodyreq.req",req.file);
        console.log("req.bodyreq.bodyreq.err",req.err);
        var subcategoryId = req.body.id;
        var categoryId = req.body.categoryId;
        var title = req.body.title;
        var swedishName = req.body.swedishName;
        var originalname = "";
        if(err){
            return res.json(err);
        }
        else{
            var files = req.file;
            console.log("files ndm",files);
            if(files !== undefined && files !== null){
                // originalname = files.originalname;
                // originalname = originalname.replace(/ /g, "");
                originalname = files.filename;
                console.log("originalname",originalname);
                if(subcategoryId == "" || subcategoryId == null){
                    console.log("2")
                    var createNew = new getSubCategory();
                    console.log("createNew",createNew);
                    createNew.set({
                        "name":title,
                        "categoryId":categoryId,
                        "swedishName":swedishName,
                        "image":originalname
                    });
                    createNew.save((err,data)=>{
                        if(err){
                            console.log("3",err)
                            return res.status(400).json({
                                "status": false,
                                "message": "Message not Found."
                            });
                        }
                        else{
                            res.redirect("/category/"+categoryId)
                        }
                    });
                }
                else{
                    getSubCategory.findOneAndUpdate({_id:subcategoryId},{$set:{name:title,swedishName:swedishName,image:originalname}},(err,data)=>{
                        if(err){
                            console.log("errorr",err);
                            res.json("Wrong Password");
                        }
                        else{
                            res.redirect("/category/"+categoryId)
                        }
                    });
                }
            }
            else{
                getSubCategory.findOneAndUpdate({_id:subcategoryId},{$set:{name:title,swedishName:swedishName}},(err,data)=>{
                    if(err){
                        console.log("errorr",err);
                        res.json("Wrong Password");
                    }
                    else{
                        res.redirect("/category/"+categoryId)
                    }
                });
            }
        }
    })
}
