import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    product_ID : String,
    user_ID : String,
    quantity : Number,
});


const Cart = mongoose.model("Cart",cartSchema);

export default Cart;