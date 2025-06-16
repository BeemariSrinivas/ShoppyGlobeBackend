import express from "express";
import mongoose from "mongoose";
import { routes } from "./Routes/product_routes.js";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ShoppyGlobe");

const db = mongoose.connection;

db.on("open",()=>{
    console.log("Connection Successful");
});

db.on("error",()=>{
    console.log("Connection not successful");
});

app.listen(3300,()=>{
    console.log("Server is running on port 3300");
});

routes(app);