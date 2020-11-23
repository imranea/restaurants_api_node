const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const restaurantsCtrl = require("../controllers/restaurants")

router.post("/create",auth,restaurantsCtrl.createRestaurant)
router.patch("/update/:id",auth,restaurantsCtrl.updateRestaurant)

module.exports = router