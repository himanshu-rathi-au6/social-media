const express = require ("express")

const{userById,allUsers ,getSingleUser, updateUser,deleteUser,userPhoto} = require("../controllers/userController.js")
const { requireSignin } = require("../controllers/Auth.js")



const router = express.Router()

router.get("/allUsers",allUsers)
router.get("/singleUser/:userId",requireSignin,getSingleUser)
router.put("/singleUser/:userId", requireSignin,updateUser)
router.delete("/singleUser/:userId", requireSignin,deleteUser)


//photoroute
router.get("/singleUser/photo/:userId",userPhoto)
//any route contaiang :userid we will execute 
router.param("userId",userById)

module.exports  = router