const express = require('express')
const { getPost, createPost, postByUser, postById,isPoster,deletePost,updatePost } = require('../controllers/postController.js')
const { requireSignin } = require('../controllers/Auth.js')
const validator = require('../middleware/postValidator.js')
const { userById } = require("../controllers/userController.js")

//dummy validator
const { body, check } = require('express-validator');


const router = express.Router()

router.get('/posts', getPost)

router.post('/post/new/:userId' ,validator.createPostValidator, requireSignin, createPost)
router.get("/posts/by/:userId", requireSignin, postByUser)

router.delete('/post/:postId',requireSignin,isPoster,deletePost)
router.put('/post/:postId',requireSignin,isPoster,updatePost)



//any route contaiang :userid we will execute 
router.param("userId", userById)

//any route contaiang :userid we will execute Post by id 
router.param("postId", postById)



module.exports = router;