const Restaurant = require("../models/Restaurant")


exports.allRestaurants = async(req,res,next)=>{ // get all restaurant
    try{
        const restaurants = await Restaurant.find()
        res.status(200).json({restaurants})
    }catch(e){
        res.status(500).json({message:e})
    }
}

exports.createRestaurant = async(req,res,next) =>{ // Create Restaurant
    try{
        const restaurant = new Restaurant(req.body)
        await restaurant.save()
        res.status(200).json({message:"Le restaurant a bien été crée"})
    }catch(e){
        res.status(400).json({message:e})
    }

}

exports.updateRestaurant= async(req,res,next)=>{ // Update Restaurant
    const updates = Object.keys(req.body) // get keys from req body
    const updateAllowed = ["name","address"] // properties allow to updat
    const isValidOperation = updates.every((update)=> updateAllowed.includes(update)) // check if the properties can be update

    if(!isValidOperation){ 
        return res.status(404).json({message:"Restaurant not found to update"})
    }

    try{
        const restaurantToUpdate = await Restaurant.findById(req.params.id) // get Restaurant with the params id
        updates.forEach(update =>{ // update the Restaurant with the new data
            restaurantToUpdate[update]=req.body[update]
        })
        await restaurantToUpdate.save() // save 

        if(!restaurantToUpdate){
            return res.status(404).json({message:"Restaurant not found to update"})
        }
        res.status(200).json({message:"Updated restaurant!"})
    }catch(e){
        res.status(500).json({message:e})
    }
}

exports.delete = async (req,res,next) =>{ // delete restaurant
    try{
       await Restaurant.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Le restaurant a bien été supprimé"})
    }catch(e){
        res.status(500).json({message:e})
    }
}