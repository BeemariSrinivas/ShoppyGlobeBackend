import mongoose from "mongoose";

//User Schema
const userSchema = mongoose.Schema(
    {
        username : String,
        password : String
    }
);


//User MOdel
const User = mongoose.model("User",userSchema);

export default User;