import { getProducts } from "../Controller/product_logic.js";
import { getProduct } from "../Controller/product_logic.js";
import jwt from "jsonwebtoken";
import { createrUser, validateUserId } from "../Controller/user_logic.js";
import { validateUser } from "../Controller/user_logic.js";
import { validateproductId } from "../Controller/product_logic.js";
import { addProduct } from "../Controller/cart_logic.js";
import { updateProduct } from "../Controller/cart_logic.js";
import { deleteProduct } from "../Controller/cart_logic.js";

//routes funtion contains all routes
export function routes(app){

    //API to fetch all products
    app.get("/products",async (req,res)=>{
        try{
            const products = await getProducts();
            return res.send(products);
        }
        catch(error){
            return res.status(500).json({error:error.message});
        }
    });

    //API to fetch product by product id
    app.get("/products/:id",async (req,res)=>{
        const productID = req.params.id;
        if(productID){
            try{
                const product = await getProduct(productID);
                if(product){
                    return res.send(product);
                }
                else{
                    return res.status(404).json({message:`Product with id ${productID} not found`})
                }
            }
            catch(error){
                return res.status(500).json({error:error.message});
            }
        }
        else{
            return res.status(404).json({message:`Enter the product id`});
        }
    });

    //API to add product to the cart
    app.post("/cart",authenticateUser,async (req,res)=>{
        const {productID, userID, quantity} = req.body;
        if(quantity>0){
            try{
                const validatedproductID = await validateproductId(productID);
                const validatedUserID = await validateUserId(userID);
                if(validatedproductID&&validatedUserID){
                    const cartItem = await addProduct(productID,userID,quantity);
                    if(cartItem){
                        return res.status(201).json(cartItem);
                    }
                    else{
                        return res.status(404).json({message:`Failed to add product to cart`});
                    }
                }
            }
            catch(error){
                return res.status(500).json({error:error.message});
            }
        }
        else{
            return res.status(400).json({message:"Quantity must be greater than 0"});
        }
    });

    //API to update cart item quantity
    app.put("/cart/:id",authenticateUser,async (req,res)=>{
        const id = req.params.id;
        const {quantity} = req.body;
        if(quantity>0){
            if(id){
                try{
                    const cartItem = await updateProduct(quantity,id);
                    if(cartItem){
                        return res.status(200).json(cartItem);
                    }
                    else{
                        return res.status(404).json({message:`CartItem with id ${id} not found`});
                    }
                }
                catch(error){
                    return res.status(500).json({error:error.message});
                }
            }
            else{
                return res.status(400).json({error:"Provide valid ID"});
            }
        }
        else{
            return res.status(400).json({message:"Quantity must be greater than 0"});
        }
    });

    //API to delete product from the cart
    app.delete("/cart/:id",authenticateUser,async (req,res)=>{
        const id = req.params.id;
        if(id){
            try{
                const cartItem = await deleteProduct(id);
                if(cartItem){
                    return res.status(200).json(cartItem);
                }
                else{
                    return res.status(404).json({message:`CartItem with id ${id} not found`});
                }
            }
            catch(error){
                return res.status(500).json({error:error.message});
            }
        }
        else{
            return res.status(400).json({error:"Provide valid ID"});
        }
    });

    //API to register a new user
    app.post("/register",async(req,res)=>{
        const {username, password} = req.body;
        if(username&&password){
            try{
                const user = await createrUser(username,password);
                const accessToken = jwt.sign(
                    {username:user.username, id:user._id},
                    "secretKey",
                    {expiresIn:"1h"});
                return res.status(201).json({token:accessToken, userID : user._id});
            }
            catch(error){
                return res.status(400).json({error:error.message});
            }
        }
        else{
            return res.status(400).json({message:"Username or password missing"});
        }
    });

    //API to authenticate an existing user(User login)
    app.post("/login",async(req,res)=>{
        const {username, password} = req.body;
        if(username&&password){
            try{
                const user = await validateUser(username,password);
                if(user){
                    const accessToken = jwt.sign(
                    {username:user.username, id:user._id},
                    "secretKey",
                    {expiresIn:"1h"});
                    return res.status(200).json({token:accessToken, userID :user._id});
                }
                else{
                    return res.status(401).json({message:"Invalid username or password"});
                }
            }
            catch(error){
                return res.status(401).json({error:error.message});
            }
        }
        else{
            return res.status(400).json({message:"Username or password missing"});
        }
    });
};

//middleware to authenticate the user
function authenticateUser(req,res,next){
    const authorization = req.headers["authorization"];
    const token = authorization&&authorization.split(" ")[1];
    jwt.verify(token,"secretKey",(err,user)=>{
        if(err){
            return res.status(403).json({message:"Invalid JWT token"});
        }
        req.user = user;
        next();
    });
}