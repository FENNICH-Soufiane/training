const { check } = require("express-validator");
const { default: slugify } = require("slugify");
const User = require("../../models/userModel");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");


exports.signupValidator = [
   check('username')
      .notEmpty().withMessage('User required')
      .isLength({ min: 3 }).withMessage('Too Short User Name')
      .custom((val, { req }) => {
         req.body.slug = slugify(val);
         return true;
      }),
   check('email')
      .notEmpty().withMessage('Email required')
      .isEmail().withMessage('Invalid email address')
      .custom((val) => {
         return User.findOne({ email: val }).then(user => {
            if (user) {
               return Promise.reject(new Error('E-mail already in user'))
            }
         })
      }),
   check('password')
      .notEmpty().withMessage('Password required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
      .custom((password, { req }) => {
         if (password !== req.body.passwordConfirm) {
            throw new Error('Password Confirmation Incerrect');
         }
         return true
      }),
   check('passwordConfirm')
      .notEmpty().withMessage('Password confirm required'),

   validatorMiddleware
];

exports.loginValidator = [
   check('email')
      .notEmpty().withMessage('Email required')
      .isEmail().withMessage('Invalid email address'),

   check('password')
      .notEmpty().withMessage('Password required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

   validatorMiddleware
]