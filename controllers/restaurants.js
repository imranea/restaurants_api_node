const Restaurant = require("../models/Restaurant")

exports.createRestaurant = async(req,res,next) =>{
    try{
        const restaurant = new Restaurant(req.body)
        await restaurant.save()
        res.status(200).json({message:"Le restaurant a bien été crée"})
    }catch(e){
        res.status(400).json({message:e})
    }

}