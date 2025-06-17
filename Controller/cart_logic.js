import mongoose from "mongoose";
import Cart from "../Model/cart.js";

export async function addProduct(productID,userID,quantity){
    const cartItem = await Cart.findOne({product_ID:productID, user_ID:userID});
    if(cartItem){
        cartItem.quantity+=quantity;
        await cartItem.save();
        return cartItem;
    }
    else{
        const newCartItem = Cart.create({
            product_ID : productID,
            user_ID : userID,
            quantity : quantity
        });
        await newCartItem.save();
        return cartItem;
    }
}

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

export async function deleteProduct(id){
    const cartItem = await Cart.findById(id);
    if(cartItem){
        await Cart.findByIdAndDelete(id);
        return cartItem;
    }
    else{
        throw new Error(`Cart Item with ID ${id} not found`);
    }
}