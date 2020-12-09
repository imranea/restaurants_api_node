const express = require("express")
const router = express.Router();
const auth = require("../middleware/auth")

const userCtrl = require("../controllers/users");

const multer = require("multer")

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,callback){
        if(!file.originalname.match(/\.(jpg || jpeg || png)/)){
            return callback(new Error('Please upload a jpg,jpeg or a png'))
        }
        callback(undefined,true)
    }
})
/* Routes Users */

router.post("/signup",userCtrl.signUp) // signup
router.post("/login",userCtrl.login) // login


router.get("/me",auth,userCtrl.me) // check if user is connected
router.post("/meAvatar",auth,upload.single('myImage'),userCtrl.meAvatar,(error,req,res,next)=>{
    res.status(400).json({error})
}) // upload an avatar for the profil
router.delete("/meAvatar",auth,userCtrl.deleteAvatar) // delete avatar user
router.get("/meAvatar/:id",userCtrl.avatarUser) // get the avatar

router.get("/allusers",auth,userCtrl.allUsers) // get list Users

router.patch("/me",auth,userCtrl.update) //update profil
router.delete("/me",auth,userCtrl.delete) // delete profil

router.get("/logout",auth,userCtrl.logout) // logout
router.post("/logoutAll",auth,userCtrl.logoutAll) // logout all sessions

module.exports = router;