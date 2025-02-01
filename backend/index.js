import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/datbase.js"

dotenv.config({});

 
const port = process.env.port || 5000;

const app=express();

app.listen(port,()=>{
    connectDB();
    console.log(`server listen at port no ${port}`);
}); 