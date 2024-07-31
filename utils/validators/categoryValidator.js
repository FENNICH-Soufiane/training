const slugify = require("slugify");
const { check, body } = require('express-validator');
const Category = require("../../src/models/categoryModel");
const validatorMiddleware = require("../../src/middlewares/validatorMiddleware");

exports.createCategoryValidator = [
    check("name")
    .notEmpty().withMessage("Category required")
    .isLength({min: 3}).withMessage("Too short category name")
    .isLength({max: 32}).withMessage("Too long category name")
    .custom((val, {req}) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware,
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid ID format'),
    validatorMiddleware
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid ID format'),
    validatorMiddleware
];

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid ID format"),
    validatorMiddleware
]