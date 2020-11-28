const express = require("express")
const router = express.Router();
const auth = require("../middleware/auth")

const userCtrl = require("../controllers/users");

/* Routes Users */

router.post("/signup",userCtrl.signUp) // signup
router.post("/login",userCtrl.login) // login
router.get("/me",auth,userCtrl.me) // check if user is connected
router.get("/allusers",auth,userCtrl.allUsers) // get list Users
router.get("/logout",auth,userCtrl.logout) // logout
router.post("/logoutAll",auth,userCtrl.logoutAll) // logout all sessions

module.exports = router;