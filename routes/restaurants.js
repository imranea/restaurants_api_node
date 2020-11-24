const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const restaurantsCtrl = require("../controllers/restaurants")

/** Route Restaurant */

router.post("/create",auth,restaurantsCtrl.createRestaurant) // create Restaurant
router.patch("/update/:id",auth,restaurantsCtrl.updateRestaurant) // update Restaurant with id

module.exports = router