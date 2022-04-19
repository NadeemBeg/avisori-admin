const getCompanies = require("../models/company");
const getInvoice = require("../models/invoice");
var multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/companyLogo')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
});

const upload = multer({ storage }).any('companyLogo');

exports.allCompanies = (req, res) =>{
    console.log("Tesign1234567890");
    getCompanies.find({isDelete:false},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",data);
            if(data !== null){
                var data1 =[] ;
                data1 = data;
                res.render('companies',{title:"login sucess",companiesDetails:data1}); 
            }
            
        }
    });
};
exports.deleteCompany = (req, res) =>{
    console.log("Tesign123",req.params.id);
    var companyId = req.params.id;
    getCompanies.findOneAndUpdate({_id:companyId},{$set:{isDelete:true}},(err,data)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            res.redirect('/companies')
        }
    });
};

exports.companyCreate = (req, res) =>{
    var data ='';
    res.render('companyEdit',{title:"login sucess",compnayDetails:data,invoice:1});
}

exports.companyView = (req, res) =>{
    console.log("${req.protocol}",req.route.path);
    var path = req.route.path;
    path =  path.search("view");
    console.log("path",path);

    console.log("Tesign1234567890",req.params.id);
    var companyId = req.params.id
    getCompanies.findOne({_id:companyId,isDelete:false},(err,companyData)=>{
        if(err){
            console.log("errorr",err);
            res.json("Wrong Password");
        }
        else{
            console.log("allusers",companyData);
            if(companyData !== null){
                getInvoice.findOne({companyId:companyId, isDelete: false},(err, invoice) => {
                    if(err){
                        console.log("errorr",err);
                        res.json("Wrong Password");
                    }
                    else{
                        console.log("invoice",invoice);
                        if(invoice !== null && invoice !== ""){
                            let data = {
                                id: companyData._id,
                                title: companyData.title,
                                description: companyData.description,
                                organisationNumber: companyData.organisationNumber,
                                email: companyData.email,
                                phone: companyData.phone,
                                address: companyData.address,
                                companyLogo: "../../uploads/companyLogo/"+companyData.companyLogo,
                                vatNumber: invoice.vatNumber,
                                bankgiro: invoice.bankgiro,
                                bankAccount: invoice.bankAccount
                            };
                            console.log("data",data);
                            if(path == 1){
                                console.log("path111", path)
                                res.render('companyView',{title:"login sucess",compnayDetails:data,invoice:1});
                            }
                            else{
                                res.render('companyEdit',{title:"login sucess",compnayDetails:data,invoice:1});
                            }
                            
                        }
                        else{
                            let data = {
                                id: companyData._id,
                                title: companyData.title,
                                description: companyData.description,
                                organisationNumber: companyData.organisationNumber,
                                email: companyData.email,
                                phone: companyData.phone,
                                address: companyData.address,
                                companyLogo: companyData.companyLogo,
                            };
                            console.log("data",data);
                            if(path == 1){
                                res.render('companyView',{title:"login sucess",compnayDetails:data,invoice:0});
                            }
                            else{
                                res.render('companyEdit',{title:"login sucess",compnayDetails:data,invoice:0});
                            }
                            
                        }
                        
                    }
                });
                 
            }
            
        }
    });
};

exports.addCompany = (req, res) => {
    upload(req,res,err => {
        const id = req.body.id;
        console.log("id",id);
        console.log("req.bodyreq.bodyreq.body",req.body);
        console.log("req.bodyreq.bodyreq.req",req.file);
        console.log("req.bodyreq.bodyreq.err",req.err);
        let originalname = '';
        var files = req.files;
        // if(files !== undefined && files !== null){
        //     originalname = files[0].filename;
        // }
        let {title, description, organisationNumber, email, phone, address, vatNumber, bankgiro, bankAccount  } = req.body;
        console.log("files",files); 
        if(files.length > 0){
            originalname = files[0].filename;
            if(id == "" || id == null){
                let companyData = {title, description, organisationNumber, email, phone, address, companyLogo: originalname   } ;
                const company = new getCompanies(companyData);
                company.save((err, company) => {
                    if(err){
                        res.status(400).json({
                            status: 0,
                            message: "Unable to add company",
                            error:err
                        });
                    }
                    let companyId = company._id;
                    let invoieData = {companyId, vatNumber, bankgiro, bankAccount };
                    let invoice = new getInvoice(invoieData);
                    console.log("invoice",invoice);
                    invoice.save((err, invoice) => {
                        if(err){
                            res.status(400).json({
                                status: 0,
                                message: "Unable to add invoice",
                                error:err
                            });
                        }
                        else{
                        console.log(invoice,"invoice2");
                        res.redirect('/companies'); 
                        }
                    });
                });
            }
            else{
                getCompanies.findOneAndUpdate({_id:id},{$set:{title:title, description:description, organisationNumber:organisationNumber, email:email, phone:phone, address:address, companyLogo:originalname}},(err,companyDetails)=>{
                    if(err){
                        res.status(400).json({
                            status: 0,
                            message: "Unable to add company",
                            error:err
                        });
                    }
                    else{
                        let companyId = id;
                        getInvoice.findOne({companyId:companyId},(err,inData)=>{
                            if(err){
                                res.status(400).json({
                                    status: 0,
                                    message: "Unable to add invoice",
                                    error:err
                                });
                            }
                            else{
                                if(inData == "" || inData == null){
                                    let companyId = companyId;
                                    let invoieData = {companyId, vatNumber, bankgiro, bankAccount };
                                    let invoice = new getInvoice(invoieData);
                                    console.log("invoice",invoice);
                                    invoice.save((err, invoice) => {
                                        if(err){
                                            res.status(400).json({
                                                status: 0,
                                                message: "Unable to add invoice",
                                                error:err
                                            });
                                        }
                                        else{
                                        console.log(invoice,"invoice2");
                                        res.redirect('/companies'); 
                                        }
                                    });
                                }
                                else{
                                    getInvoice.findOneAndUpdate({companyId:companyId},{$set:{vatNumber:vatNumber, bankgiro:bankgiro, bankAccount:bankAccount}},(err,invoiceData)=>{
                                        if(err){
                                            res.status(400).json({
                                                status: 0,
                                                message: "Unable to add invoice",
                                                error:err
                                            });
                                        }
                                        else{
                                            console.log(invoiceData,"invoice22");
                                            res.redirect('/companies'); 
                                        }
                                    });
                                }
                            }
                        });
                    }
                })
            }
        }
        else{
            getCompanies.findOneAndUpdate({_id:id},{$set:{title:title, description:description, organisationNumber:organisationNumber, email:email, phone:phone, address:address}},(err,companyDetails)=>{
                if(err){
                    res.status(400).json({
                        status: 0,
                        message: "Unable to add company",
                        error:err
                    });
                }
                else{
                    let companyId = id;
                    getInvoice.findOne({companyId:companyId},(err,inData)=>{
                        if(err){
                            res.status(400).json({
                                status: 0,
                                message: "Unable to add invoice",
                                error:err
                            });
                        }
                        else{
                            if(inData == "" || inData == null){
                                let companyId = id;
                                let invoieData = {companyId, vatNumber, bankgiro, bankAccount };
                                let invoice = new getInvoice(invoieData);
                                console.log("invoice",invoice);
                                invoice.save((err, invoice) => {
                                    if(err){
                                        res.status(400).json({
                                            status: 0,
                                            message: "Unable to add invoice",
                                            error:err
                                        });
                                    }
                                    else{
                                    console.log(invoice,"invoice2");
                                    res.redirect('/companies'); 
                                    }
                                });
                            }
                            else{
                                getInvoice.findOneAndUpdate({companyId:companyId},{$set:{vatNumber:vatNumber, bankgiro:bankgiro, bankAccount:bankAccount}},(err,invoiceData)=>{
                                    if(err){
                                        res.status(400).json({
                                            status: 0,
                                            message: "Unable to add invoice",
                                            error:err
                                        });
                                    }
                                    else{
                                        console.log(invoiceData,"invoice22");
                                        res.redirect('/companies'); 
                                    }
                                });
                            }
                        }
                    });
                }
            })
        }
    });
}