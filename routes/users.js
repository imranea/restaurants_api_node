const express = require("express")
const router = express.Router();
const auth = require("../middleware/auth")

const userCtrl = require("../controllers/users");


router.post("/signup",userCtrl.signUp)
router.post("/login",userCtrl.login)
router.get("/me",auth,userCtrl.me)
router.get("/allusers",auth,userCtrl.allUsers)

module.exports = router;