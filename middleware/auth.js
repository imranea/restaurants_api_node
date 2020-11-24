const jwt = require('jsonwebtoken')
const User = require("../models/User")

const auth = async(req,res,next) =>{ // middleware auth
    try{
        const token = req.header("Authorization").replace("Bearer ","") // get token 
        const decoded = jwt.verify(token,"thisismynewcourse") // check if token is valid
        const user = await User.findOne({_id:decoded._id,"tokens.token":token}) // get user concerned

        if(!user){ 
            throw new Error()
        }
        req.token = token 
        req.user = user
        next()
    }catch(error){
        res.status(401).send({error:"Please authenticate"})
    }
}

module.exports = auth