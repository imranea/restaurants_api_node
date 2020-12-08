const express = require("express");
require("./db/db")

const userRoutes = require("./routes/users")
const restaurantsRoutes = require("./routes/restaurants")
require("dotenv").config()

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());


app.use("/api/auth",userRoutes);
app.use("/api/restaurants", restaurantsRoutes)


app.listen(process.env.PORT,()=>{
  console.log("Listening on port "+process.env.PORT)
})
