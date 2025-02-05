import mongoose from "mongoose";


export const connectDB = async() => {
    console.log("Database connected!");
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
                console.log("MongoDB database connected");
            }).catch((error)=>{
                console.log(error);
            })
};

// export default connectDB;

// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb://localhost:27017/demo", {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("MongoDB Connected Successfully!");
//     } catch (error) {
//         console.error("MongoDB Connection Failed:", error);
//         process.exit(1); // Stop the app if connection fails
//     }
// };
