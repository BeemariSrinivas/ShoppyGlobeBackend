import { Product } from "../Model/product.js";

export async function getProducts(){
    const products = await Product.find();
    if(products){
        return products;
    }
    else{
        throw new Error("Failed to fetch products");
    }
}

export async function getProduct(id) {
    const product = await Product.findById(id);
    if(product){
        return product;
    }
    else{
        throw new Error("Invalid Product Id");
    }
}

export async function validateproductID(id) {
    const product = await Product.findById(id);
    if(product){
        return true;
    }
    else{
        throw new Error("Invalid Product id");
    }
}