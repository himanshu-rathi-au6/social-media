const User = require("../models/userModel")
const _ = require('lodash')

exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err,user)=>{
      if(err || !user){
          return res.status(400).json({
              err:"User not Found"
          })
      }
      req.profile= user  //adds profile object in req with user info
      next()
    })
}

exports.hasAuthorization = (req,res,next) =>{
    const authorizied  = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorizied){
        return res.status(403).json({
            error:"User is not authorized to perform this action"
        })
    }
}
exports.allUsers = (req,res) =>{
  User.find((err,users)=>{
      if(err){
          return res.status(400).json({
              error:err
          })

      }
      res.json( users )
  }).select("name email updated created ") // to get only selected field in the output
}

exports.getSingleUser= (req,res)=>{
    req.profile.hashed_password = undefined;
    req.profile.salt =undefined;
    return res.status(200).json(req.profile)
}

exports.updateUser = (req,res,next) =>{
    let user = req.profile
    user = _.extend(user,req.body) // we use load dash to update the user so we extend user and update the source by taking input from the body
    user.updated = Date.now()
    user.save((err)=>{
        if(err){
            return res.status(400).json({error:"You are not authorized to perform this action"})
        }
        user.hashed_password = undefined;
        user.salt =undefined;
        res.json({user})
    })
}

exports.userPhoto = (req,res,next) =>{
    if(req.profile.photo.data){
        res.set("Content-Type",req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
    next()
}

exports.deleteUser = (req,res,next) =>{
    let user = req.profile 
    user.remove((err,user)=>{
        if (err){
            res.status(400).json({
                error:"user Not deleted",err
            })
        }
       
        res.status(200).json({ message:"account has been deletd"})
    })
}