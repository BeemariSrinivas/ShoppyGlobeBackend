import User from "../Model/user.js";
import bcrypt from "bcrypt"

export async function createrUser(username,password){
    if(password.length>=6){
        const existingUser = await User.findOne({username});
        if(existingUser){
            throw new Error("user already exist, please login");
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            username : username,
            password : hashedPassword
        });
        return(newUser);
    }
    else{
        throw new Error("Password must contain minimum 6 characters");
    }
}

export async function validateUser(username,password) {
    const existingUser = await User.findOne({username});
    if(existingUser){
        const decryptedPassword = await bcrypt.compare(password,existingUser.password);
        if(!decryptedPassword){
            throw new Error("username or password is incorrect");
        }
        else{
            return existingUser;
        }
    }
    else{
        throw new Error("User not exist, please register");
    }
}


export async function validateUserId(id) {
    const user = await User.findById(id);
    if(user){
        return user;
    }
    else{
        throw new Error("User not exist, please register");
    }
}