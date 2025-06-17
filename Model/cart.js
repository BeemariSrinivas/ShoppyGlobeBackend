import mongoose from "mongoose";


//Cart schema
const cartSchema = mongoose.Schema({
    product_ID : String,
    user_ID : String,
    quantity : Number,
});

//Cart Model
const Cart = mongoose.model("Cart",cartSchema);

export default Cart;