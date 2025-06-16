import { Product } from "../Model/product.js";

export async function getProducts(){
    const products = await Product.find();
    return products;
}

export async function getProduct(id) {
    const product = await Product.findById(id);
    return product;
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