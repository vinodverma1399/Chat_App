import express from "express";
import dotenv from "dotenv";

dotenv.config({});
 
const port = process.env.port || 5300;

const app=express();

app.listen(port,()=>{
    console.log(`server listen at port no ${port}`);
}); 