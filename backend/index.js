import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

dotenv.config({});

connectDB();
 
const PORT = process.env.PORT || 5001;

const app=express();
//middleware
app.use(express.json());
app.use(cookieParser());
//routes
app.use("/api/v1/user",userRoute);
//http://localhost:8081/api/v1/user/register

app.listen(PORT,()=>{
    console.log(`server listen at port no ${PORT}`);
});