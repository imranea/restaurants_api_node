const User = require('../models/User');
const sharp = require('sharp');
const {sendDeleteEmail,sendWelcomeEmail} = require('../emails/account')

exports.signUp = async (req,res,next) =>{ // signup
    const user = new User(req.body) // instance a new user
    try{
        const token = await user.generateAuthToken() // create a token
        sendWelcomeEmail(user.email,user.firstname)
        await user.save(); // save user
        res.status(200).json({user,token})
    }catch(e){
        res.status(400).json({message:e})
    }
}

exports.login = async (req,res)=>{ // login
    try{
        const user= await User.findByCredentials(req.body.email,req.body.password) // check if user exist
        const token = await user.generateAuthToken() // create token
        res.send({user,token})
    }catch(e){
        res.status(400).json({message:"Le compte n'existe pas"})
    }  
}

exports.logout = async(req,res,next) =>{ //logout
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).json({message:"Vous avez bien été déconnecté"})
    }catch(e){
        res.status(400).json({message:e})
    }
}

exports.logoutAll = async (req,res,next) =>{  //logout all
    try{
        req.user.tokens=[]
        await req.user.save()
        res.status(200).json({message:"Toutes vos sessions ont bien été déconnectés"})
    }catch(e){
        res.status(400).json({message:e})
    }
}

exports.me = (req,res) =>{ // check if user is connected
    res.status(200).json(req.user)
}

exports.meAvatar = async(req,res) =>{
    try{
        const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
        req.user.avatar = buffer
        await req.user.save()
        res.status(200).send({message:"The avatar was upload"})
    }catch(e){
        res.status(404).send({message:e})
    }
}

exports.deleteAvatar = async(req,res) =>{
    req.user.avatar=undefined
    await req.user.save()
    res.status(200).send({message:"The avatar was delete"})
}


exports.avatarUser = async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)

    }catch(e){
        res.status(404).json({message:e})
    }
}

exports.allUsers = async(req,res) =>{
    try{
        const users = await User.find()
        res.status(200).json({users})
    }catch(e){
        res.status(500).json({message:e})
    }
}

exports.update = async(req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name','email','password']

    const isValideOperation = updates.every( update => allowedUpdate.includes(update))

    if(!isValideOperation){
        return res.status(404).send({ error: "Invalid update!" })
    }

    try{
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
}

exports.delete = async(req,res) =>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).json({erreur:e})
    }
}