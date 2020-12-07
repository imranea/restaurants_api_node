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
    vicinity:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    geometry:{
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
    },
    ratings:{
        type:Number,
        required:true,
        trim:true
    },
    types:[
        {
            type:String,
            trim:true,
            default:null
        }
     ],
    image:{
        type:String,
        required:true,
        trim:true,
        default:null
     },
    reviews:[{
        author_name:{
            type:String,
            trim:true,
            required:true
        },
        profile_photo_url:{
            type:String,
            trim:true,
            default:null
        },
        rating:{
            type:Number,
            trim:true,
            required:true
        },
        text:{
            type:String,
            trim:true,
            required:true
        },

    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }

},{
    timestamps:true
})



const Restaurant = mongoose.model("Restaurant",restaurantSchema)
module.exports = Restaurant