import mongoose from "mongoose";
import Cart from "../Model/cart.js";

//adds product to the cart
export async function addProduct(productID,userID,quantity){
    const cartItem = await Cart.findOne({product_ID:productID, user_ID:userID});
    if(cartItem){
        cartItem.quantity+=quantity;
        await cartItem.save();
        return cartItem;
    }
    else{
        const newCartItem = await Cart.create({
            product_ID : productID,
            user_ID : userID,
            quantity : quantity
        });
        return newCartItem;
    }
}

//updates the product quantity of a product in the cart
export async function updateProduct(quantity,id){
    const cartItem = await Cart.findById(id);
    if(cartItem){
        cartItem.quantity=quantity;
        await cartItem.save();
        return cartItem;
    }
    else{
        throw new Error(`Cart Item with ID ${id} not found`);
    }
}


//deletes product from the cart
export async function deleteProduct(id){
    const cartItem = await Cart.findByIdAndDelete(id);
    if(cartItem){
        return cartItem;
    }
    else{
        throw new Error(`Cart Item with ID ${id} not found`);
    }
}