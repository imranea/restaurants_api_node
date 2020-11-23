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

exports.updateRestaurant= async(req,res,next)=>{
    const updates = Object.keys(req.body)
    console.log(updates)
    const updateAllowed = ["name","address"]
    const isValidOperation = updates.every((update)=> updateAllowed.includes(update))

    if(!isValidOperation){
        return res.status(404).json({message:"Restaurant not found to update"})
    }

    try{
        const restaurantToUpdate = await Restaurant.findById(req.params.id)
        updates.forEach(update =>{
            restaurantToUpdate[update]=req.body[update]
        })
        await restaurantToUpdate.save()

        if(!restaurantToUpdate){
            return res.status(404).json({message:"Restaurant not found to update"})
        }
        res.status(200).json({message:"Updated restaurant!"})
    }catch(e){
        res.status(500).json({message:e})
    }
}