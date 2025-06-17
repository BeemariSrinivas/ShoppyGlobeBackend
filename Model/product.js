import mongoose from "mongoose";

//Product Schema
const productSchema = mongoose.Schema({
    name : String,
    price : Number,
    description : String,
    stockQuantity : Number,
});

//Product Model
export const Product = mongoose.model("Product",productSchema);