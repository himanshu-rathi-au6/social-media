const express = require ("express")
const { signup, signin ,signout} =  require("../controllers/Auth")
const{userById } = require("../controllers/userController.js")
const { userSignupValidator} = require("../middleware/postValidator.js")


const router = express.Router()
router.post("/signup",userSignupValidator,signup)
router.post("/signin",signin)
router.get("/signout",signout)

//any route contaiang :userid we will execute 
router.param("userId",userById)

module.exports  = router