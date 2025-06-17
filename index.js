import express from "express";
import mongoose from "mongoose";
import { routes } from "./Routes/product_routes.js";


//Server
const app = express();

//Middleware to parse json data
app.use(express.json());

//connecting to MongoDB
mongoose.connect("mongodb://localhost:27017/ShoppyGlobe");

//verifies mongoose connection
const db = mongoose.connection;

db.on("open",()=>{
    console.log("Connection Successful");
});

db.on("error",()=>{
    console.log("Connection not successful");
});

//Server listening on 3300 port
app.listen(3300,()=>{
    console.log("Server is running on port 3300");
});


//routes function
routes(app);