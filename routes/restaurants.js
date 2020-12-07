const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const restaurantsCtrl = require("../controllers/restaurants")

/** Route Restaurant */

router.get("/allRestaurants",auth,restaurantsCtrl.allRestaurants)
router.get("/userRestaurants",auth,restaurantsCtrl.userRestaurants)
router.post("/create",auth,restaurantsCtrl.createRestaurant) // create Restaurant
router.patch("/update/:id",auth,restaurantsCtrl.updateRestaurant) // update Restaurant with id
router.delete("/delete/:id",auth,restaurantsCtrl.delete)

module.exports = router