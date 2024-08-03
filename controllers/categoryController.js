const Category = require("../models/categoryModel");
const factory = require("./handlersFactory")




const getAllCategories = factory.getAll(Category)

const getSingleCategory = factory.getOne(Category);

const createCategory = factory.createOne(Category);

const updateCategory = factory.updateOne(Category);

const deleteCategory = factory.deleteOne(Category);

module.exports = { getAllCategories, getSingleCategory, createCategory, updateCategory, deleteCategory };
