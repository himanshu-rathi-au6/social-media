const Post = require('../models/postModel.js')
const formidable = require('formidable')
const fs = require ('fs')
const _ = require("lodash")


exports.postById = (req,res,next,id)=>{
Post.findById(id)
.populate("postedBy", "_id name")
.exec((err,post) =>{
    if(err || !post){
        return res.status(400).json({
            error:err
        })
    }
    req.post =post
    next()
})
}

exports.getPost = (req,res) =>{
 const posts = Post.find()
 .populate("postedBy","_id name")
 .select("_id title body") // to select only things we want to see
 .then ((posts)=> {
     res.status(200).json({posts})
 })
 .catch(err => console.log(colors.red(err)))
}

// creating a new post
exports.createPost = (req,res,next) =>{
let form = new formidable.IncomingForm()
form.keepExtensions = true
form.parse(req,(err,fields,files)=>{
  if (err){
      return res.status(400).json({
          error:"Image cannot be uploaded"
      })
  }
  let post = new Post(fields)
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  post.postedBy = req.profile
  if(files.photo){
      post.photo.data = fs.readFileSync(file.photo.path)
      post.photo.contentType = files.photo.type
  }
  post.save((err,result) =>{
      if(err){
          res.status(400).json({error:err})
      }
      res.json(result)
  })
})

}

exports.postByUser = (req, res)=>{
    Post.find({postedBy: req.profile._id})
    .populate("postedBy","_id name") // since it is in another model so we use populate
    .sort("_created")// new post will appear first
    .exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json({posts})

    })
}

exports.isPoster = (req,res,next) =>{
    var isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id


   

    if(!isPoster){
        return res.status(403).json({
            error:"user is Not authorized "
        })
    }
    next()
}

exports.updatePost = (req,res,next) =>{
    let post = req.post
    post = _.extend(post,req.body)
    post.updated = Date.now()
    post.save(err =>{
        if (err){
            return res.status(400).json({
                error:err
            })
        }
        res.json(post)
    })
}


exports.deletePost = (req,res)=>{
    let post = req.post
    post.remove((err,post)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json({
            message:"Post Deleted successfully"
        })
    })

}