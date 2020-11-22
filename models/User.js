const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("It's not a email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isLength(value,{min:6})){
                throw new Error("Must have more than 6 letters")
            }
            if(validator.contains(value.toLowerCase(),"password")){
                throw new Error("Your password is password")
            }
        },
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},"thisismynewcourse")
    user.tokens = user.tokens.concat({token})

    await user.save();
    return token
}

userSchema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Unable to login")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user
}

userSchema.pre("save", async function(next){
    const user = this
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,10)
    }

    next()
})

const User = mongoose.model("User",userSchema)

module.exports = User