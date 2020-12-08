const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const Restaurant = require('./Restaurant')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isLength(value,{min:2})){
                throw new Error('Must have more than 2 letters')
            }
        }
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isLength(value,{min:2})){
                throw new Error('Must have more than 2 letters')
            }
        }
    },
    profession:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isLength(value,{min:2})){
                throw new Error('Must have more than 2 letters')
            }
        }
    },
    age:{
        type:Number,
        required:true,
        trim:true,
        lowercase:true
    },
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
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
});

userSchema.virtual('restaurants',{ // configure relation between User and Task
    ref:'Restaurant', // collection to bind
    localField:'_id', // _id in collection User
    foreignField:'owner' // foreign key in collection Restaurant
})

userSchema.methods.toJSON = function(){
    const user= this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function(){ // method async 
    const user = this 
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_TOKEN) // create token with a string 
    user.tokens = user.tokens.concat({token}) // add token in array of token

    await user.save(); // asve
    return token
}

userSchema.statics.findByCredentials = async (email,password) =>{ // check if user exist in database
    const user = await User.findOne({email}) // find user by email
    if(!user){ 
        throw new Error("Unable to login")
    }
    const isMatch = await bcrypt.compare(password,user.password) // check password enter with the password in collection
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user
}

userSchema.pre("save", async function(next){  // before save, hash of password
    const user = this
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,10)
    }

    next()
})

const User = mongoose.model("User",userSchema)

module.exports = User