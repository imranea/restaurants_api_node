const mongoose = require("mongoose");
const validator=  require("validator")

/** Collection Restaurant */
const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isLength(value,{min:6})){
                throw new Error("Must have more 6 letters")
            }
        }
    },
    address:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    latitude:{
        type:Number,
        required:true,
        trim:true
    },
    longitude:{
        type:Number,
        required:true,
        trim:true
    }

})



const Restaurant = mongoose.model("Restaurant",restaurantSchema)
module.exports = Restaurant