const User = require('../models/User')



exports.allUsers = async(req,res) =>{
    try{
        const users = await User.find()
        res.status(200).json({users})
    }catch(e){
        res.status(500).json({message:e})
    }
}
exports.signUp = async (req,res,next) =>{
    const user = new User(req.body)
    try{
        const token = await user.generateAuthToken()
        await user.save();
        res.status(200).json({user,token})
    }catch(e){
        res.status(400).json({message:e})
    }
}

exports.login = async (req,res)=>{
    try{
        const user= await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).json({message:e})
    }  
}

exports.me = (req,res) =>{
    res.send(req.user)
}