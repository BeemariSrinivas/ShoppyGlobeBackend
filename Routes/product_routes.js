import { getProducts } from "../Controller/product_logic.js";
import { getProduct } from "../Controller/product_logic.js";
import jwt from "jsonwebtoken";
import { createrUser, validateUserId } from "../Controller/user_logic.js";
import { validateUser } from "../Controller/user_logic.js";
import { validateproductID } from "../Controller/product_logic.js";

export function routes(app){


    app.get("/products",async (req,res)=>{
        try{
            const products = await getProducts();
            res.send(products);
        }
        catch(error){
            res.status(500).json({error:"Failed to fetch products"});
        }
    });


    app.get("/products/:id",async (req,res)=>{
        const productID = req.params.id;
        if(productID){
            try{
                const product = await getProduct(productID);
                if(product){
                    res.send(product);
                }
                else{
                    res.status(404).json({message:`Product with id ${productID} not found`})
                }
            }
            catch(error){
                res.status(500).json({error:"Failed to fetch product"});
            }
        }
        else{
            res.status(404).json({message:`Enter the product id`});
        }
    });


    app.post("/cart",async (req,res)=>{
        const {productID, userID, quantity} = req.body;
        const validatedproductID = validateproductID(productID);
        const validatedUserID = validateUserId(userID);
        if(quantity>0){
            if(validatedproductID&&validatedUserID){
                
            }
        }
        else{
            res.status(400).json({message:"Quantity must be greater than 0"});
        }
    });


    app.put("/cart/:id",(req,res)=>{

    });


    app.delete("/cart/:id",(req,res)=>{

    });


    app.post("/register",async(req,res)=>{
        try{
            const {username, password} = req.body;
            const user = await createrUser(username,password);
            const accessToken = jwt.sign(
                {username:user.username, id:user._id},
                "secretKey",
                {expiresIn:"1h"});
            res.status(201).json({token:accessToken});
        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    });


    app.post("/login",async(req,res)=>{
        const {username, password} = req.body;
        try{
            const user = await validateUser(username,password);
            if(user){
                const accessToken = jwt.sign(
                {username:user.username, id:user._id},
                "secretKey",
                {expiresIn:"1h"});
                res.status(201).json({token:accessToken});
            }
        }
        catch(error){
            res.status(401).json({error:error.message});
        }
    });
};