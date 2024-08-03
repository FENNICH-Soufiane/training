const express = require("express");
const {getAllProducts, getSingleProduct, createProduct,updateProduct, deleteProduct} = require("../controllers/productController");
const {getProductValidator, updateProductValidator, deleteProductValidator, createProductValidator } = require("../utils/validators/productValidator");
const photoUpload = require("../middlewares/photoUpload");

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/product/:id', getProductValidator, getSingleProduct);
router.post('/product', photoUpload.array("files", 10),  createProduct);
router.put('/product/:id', updateProductValidator, updateProduct);
router.delete('/product/:id', deleteProductValidator, deleteProduct);


module.exports = router ;