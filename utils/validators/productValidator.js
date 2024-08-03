const slugify = require('slugify');
const { check } = require('express-validator');
const validatorMiddleware = require("../../middlewares/validatorMiddleware");


exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID format'),
    validatorMiddleware
];

exports.updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID format'),
    validatorMiddleware
];

exports.getProductValidator = [
    check('id').isMongoId().withMessage("Invalid Id format"),
    validatorMiddleware
];

exports.createProductValidator = [
    check('name')
        .isLength({ min: 3 }).withMessage('must be at least 3 chars')
        .notEmpty().withMessage('Product required')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true
        }),
    check('description')
        .notEmpty().withMessage('Product description is required')
        .isLength({ max: 2000 }).withMessage('Too long description'),
    check('quantity')
        .notEmpty().withMessage('Product quantity is required')
        .isNumeric().withMessage('Product quantity ùust be a numeric'),
    check('price')
        .notEmpty().withMessage('Product price is required')
        .isNumeric().withMessage('Product price must be a number')
        .isLength({ max: 7 }).withMessage('Too long price'),
    check('priceAfterDiscount')
        .optional()
        .isNumeric().withMessage('Product priceAfterDiscount must be a number')
        .toFloat()
        .custom((value, { req }) => {
            if (req.body.price <= value) {
                throw Error("priceAfterDiscount must be lower than price")
            }
            return true;
        }),
    // check("category")
    //     .notEmpty().withMessage("Product must be belong to a category")
    //     .isMongoId().withMessage("Invalid ID format")
    //     .custom((categoryId) => {
    //         Category.findById(categoryId).then((category) => {
    //             if (!category) {
    //                 return Promise.reject(new Error("no category for this id", categoryId))
    //             }
    //         })
    //     })
]