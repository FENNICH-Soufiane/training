const Product = require("../models/productModel");
const factory = require("./handlersFactory")




const getAllProducts = factory.getAll(Product, 'Product', "category")

const getSingleProduct = factory.getOne(Product);

const createProduct = factory.createOne(Product);

const updateProduct = factory.updateOne(Product);

const deleteProduct = factory.deleteOne(Product);

module.exports = { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct };
