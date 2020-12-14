const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const restaurantsCtrl = require("../controllers/restaurants")
const multer = require("multer")


const upload = multer({
    limits:{
        fileSize:2000000
    },
    fileFilter(req,file,callback){
        if(!file.originalname.match(/\.(jpg || jpeg || png)/)){
            return callback(new Error('Please upload a jpg,jpeg or a png'))
        }
        callback(undefined,true)
    }
})
/** Route Restaurant */

router.get("/allRestaurants",auth,restaurantsCtrl.allRestaurants)
router.get("/userRestaurants",auth,restaurantsCtrl.userRestaurants)
router.get("/userRestaurants/:id",auth,restaurantsCtrl.getRestaurantById)
router.get("/userRestaurants/photo/:id",restaurantsCtrl.getPhotoRestaurant)
router.post("/create",auth,upload.single('myImage'),restaurantsCtrl.createRestaurant) // create Restaurant
router.patch("/update/:id",auth,upload.single('myImage'),restaurantsCtrl.updateRestaurant) // update Restaurant with id
router.delete("/delete/:id",auth,restaurantsCtrl.delete)

module.exports = router