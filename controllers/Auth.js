const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const jwt1 =  require('express-jwt')
require('dotenv').config



//Registering
exports.signup = async (req,res) =>{
    const userExist = await User.findOne({email: req.body.email})
    if(userExist) return res.status(403).json({
        error:"Email already Taken"
    })
    const user =  await new User(req.body)
    await user.save()
    res.status(200).json({ message:"signup successful go and login" })
};

//Login
exports.signin = (req,res) =>{
    //find the user using email

    const { email,password } = req.body
    User.findOne({email},(err,user)=>{
      if (err || !user){
          return res.status(401).json({
              error:"User with that email does't exist . Please sign in"
          })
      }
      if (!user.authenticate(password)){
          return res.status(401).json({
              error:"email or passoword  does't match"
          })
      }
      const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
      res.cookie("n",token,{
          expire:new Date()+9999
      })
      const {_id,name,email} = user 
      return res.json({token,user:{_id,email,name}})

    })

}

//Logout
exports.signout = (req,res) => {
    res.clearCookie("n")
    return res.status(200).json({message:"sign ot succesful"})
}


exports.requireSignin = jwt1({
    //if the token is valid express jwt appends the varified user id 
    secret: process.env.JWT_SECRET,algorithms: ['HS256'] ,
    userProperty:"auth"
})