const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config() 

/** connect to MongoDb with mongoose */
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8lzvd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
}) 
.then(()=>console.log("Connexion à MongoDB réussie!"))
.catch(()=> console.log("Connexion à Mongo a echoué"))