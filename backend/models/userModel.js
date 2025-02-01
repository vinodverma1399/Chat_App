import mongoose from "mongoose"

 const userModel=new mongoose.schema({
    fullName:{
        type:String,
        required:true,
    },

    userName:{
        type:String,
        required:true,
        unique:true,
    },

    Password:{
        type:String,
        required:true,
    },

    gender:{
        type:String,
        enum:["male","female"],
        required:true,
    },

    profilePhoto:{
        type:String,
        default:""
    }

 });

 export const User =mongoose.model("User",userModel);