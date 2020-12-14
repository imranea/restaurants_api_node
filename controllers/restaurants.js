const Restaurant = require("../models/Restaurant")
const sharp = require('sharp');

exports.allRestaurants = async(req,res,next)=>{ // get all restaurant
    try{
        const restaurants = await Restaurant.find()
        res.status(200).json({restaurants})
    }catch(e){
        res.status(500).json({message:e})
    }
}

exports.userRestaurants = async(req,res,next)=>{ // get all restaurant
    try{
        await req.user.populate("restaurants").execPopulate()
        res.status(200).json(req.user.restaurants)
    }catch(e){
        res.status(500).json({message:e})
    }
}

exports.getRestaurantById = async(req,res) =>{
    try{
        const restaurant = await Restaurant.findOne({_id:req.params.id,owner:req.user._id})
        if(!restaurant){
            res.status(404).send({message: "Restaurant not found"})
        }
        res.status(200).send({restaurant})
    }catch(e){
        res.status(500).send({error:e})
    }
}

exports.getPhotoRestaurant = async(req,res,next) =>{
    try{
        const restaurantPhoto = await Restaurant.findById(req.params.id)

        if(!restaurantPhoto || !restaurantPhoto.image){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(restaurantPhoto.image)
    }
    catch(e){
        res.status(404).json({message:e})
    }
}

exports.createRestaurant = async(req,res,next) =>{ // Create Restaurant
    try{
        const buffer = await sharp(req.file.buffer).resize({width:345,height:345}).png().toBuffer()
        const restaurant = new Restaurant({
            ...JSON.parse(req.body.restaurant),
            image:buffer,
            owner:req.user._id
        })
        await restaurant.save()
        res.status(200).json({message:"Le restaurant a bien été crée"})
    }catch(e){
        res.status(400).json({message:e})
    }

}

exports.updateRestaurant= async(req,res,next)=>{ // Update Restaurant
    const restaurant = JSON.parse(req.body.restaurant)
    const updates = Object.keys(restaurant) // get keys from req body
    const updateAllowed = ["name","vicinity","geometry","address","postalCode","city","ratings","types","reviews"] // properties allow to updat
    const isValidOperation = updates.every((update)=> updateAllowed.includes(update)) // check if the properties can be update
    if(!isValidOperation){ 
        return res.status(404).json({message:"Restaurant not found to update"})
    }

    try{
        const restaurantToUpdate = await Restaurant.findOne({_id:req.params.id,owner:req.user._id}) // get Restaurant with the params id
        if(!restaurantToUpdate){
            return res.status(404).json({message:"Restaurant not found to update"})
        }
        updates.forEach(update =>{ // update the Restaurant with the new data
            restaurantToUpdate[update]=restaurant[update]
        })
        if(req.file){
            const buffer = await sharp(req.file.buffer).resize({width:345,height:345}).png().toBuffer()
            restaurantToUpdate.image = buffer
        }
        await restaurantToUpdate.save() // save 
        res.status(200).json({message:"Updated restaurant!"})
    }catch(e){
        res.status(500).json({message:e})
    }
}

exports.delete = async (req,res,next) =>{ // delete restaurant
    try{
        const restaurantToDelete= await Restaurant.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!restaurantToDelete){
            res.status(404).json({message:"Vous ne pouvez pas supprimé le restaurant"})
        }
        res.status(200).json({message:"Le restaurant a bien été supprimé"})
    }catch(e){
        res.status(500).json({message:e})
    }
}