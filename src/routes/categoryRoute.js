const express = require("express");
const {getAllCategories, getSingleCategory, createCategory, updateCategory, deleteCategory} = require("../controllers/categoryController");
const {getCategoryValidator,deleteCategoryValidator, updateCategoryValidator, createCategoryValidator } = require("../../utils/validators/categoryValidator")

const router = express.Router();

router.get('/categories', getAllCategories);
router.get('/category/:id', getCategoryValidator, getSingleCategory);
router.post('/category', createCategoryValidator, createCategory);
router.put('/category/:id', updateCategoryValidator, updateCategory);
router.delete('/category/:id', deleteCategoryValidator, deleteCategory);


module.exports = router ;