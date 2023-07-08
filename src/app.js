import express from "express";

import ProductManager from "./productsManager.js"


const app=express();
const productManager=new ProductManager("./products.json");

const PORT=8080;

app.get("/", (req,res)=>{
   res.end ("hola mundo");
});

app.get("/products", async (req,res)=>{
    try{
        const limit=req.query.limit;
        const products=await productManager.getProducts();
       
        if(limit){
            res.json(products.slice(0,limit))
        }else{
            res.json(products)
        }
    }

    catch(error){
        console.log(error)
    }
});



app.get("/products", async (req,res)=>{
    try{
        const limit=req.query.limit;
        const products=await productManager.getProducts();
       
        if(limit){
            res.json(products.slice(0,limit))
        }else{
            res.json(products)
        }
    }

    catch(error){
        res.json({message:"productos no encontrados"})
    }
});


app.get("/products/:pid", async (req,res)=>{
    
    try{
        let productId=req.params.pid;
        
        const products=await productManager.getProductById(productId);
        
        if (products) {
        res.json(products);
        } 
        } catch (err) {
            res.json({message:"no existe ese producto con ese id"})
        }
       
});



app.listen (PORT,()=>{
    console.log (`servidor escuchando en el puerto: ${PORT}`)
});
