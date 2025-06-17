import { Product } from "../Model/product.js";

//gets all the products from MongoDB
export async function getProducts(){
    const products = await Product.find();
    if(products){
        return products;
    }
    else{
        throw new Error("Failed to fetch products");
    }
}


//gets a product by id from MongoDB
export async function getProduct(id) {
    const product = await Product.findById(id);
    if(product){
        return product;
    }
    else{
        throw new Error("Invalid Product Id");
    }
}


//validates product
export async function validateproductId(id) {
    const product = await Product.findById(id);
    if(product){
        return product;
    }
    else{
        throw new Error("Invalid Product Id");
    }
}