var express = require('express');
var router = express.Router();
const category = require("../controllers/category");
const {verifyAuth} = require('../middleware/auth');
router.get('/',verifyAuth,category.allCategory);
// router.get('/category/:id?',category.allCategory);
router.get('/mainCreate',verifyAuth,category.categoryCreate);
router.get('/:id',verifyAuth,category.categoryBySubCategory);
router.get('/edit/:id',verifyAuth,category.categoryEdit);
router.get('/subcategoryedit/:id',verifyAuth,category.subCategoryEdit);
router.post('/',verifyAuth,category.categorySave);
router.post('/subcSave/:id',verifyAuth,category.subCategorySave);
router.get('/create/:id',verifyAuth,category.subCategoryAdd);
router.get('/subcategoryDelete/:id',verifyAuth,category.subcategoryDelete);

module.exports = router;