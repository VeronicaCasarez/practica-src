import express from "express";
import ProductManager from "./productsManager.js"


const app=express();
const productManager=new ProductManager("../products.json");

const PORT=8080;

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



app.listen (PORT,()=>{
    console.log (`servidor escuchando en el puerto: ${PORT}`)
});