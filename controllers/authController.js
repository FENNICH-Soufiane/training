const User = require("../models/userModel")
const generateToken = require("../utils/generateToken")




exports.signup = async (req, res, next) => {

   const { username, email, password } = req.body;

   const userExists = await User.findOne({ email });
   if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
   }
   try {
      const user = await User.create({username, email, password})
      const token = generateToken(user._id);

      res.status(201).json({_id: user._id, user, token});
   } catch (error) {
      res.status(500).json({message: error.message})
   }
};

exports.login = async (req, res, next) => {
   const {email, password} = req.body;

   try {
      const user = await User.findOne({email});
      if(user && (await user.matchPassword(password))){
         const token = generateToken(user._id);
         delete user._doc.password;
         res.status(200).json({data: user, token})
      }
   } catch (error) {
      res.status(500).json({message: error.message})
   }
}

