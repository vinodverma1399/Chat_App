import User from "../models/userModel.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: "User already exists, try a different username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?userame=${userName}`;

   
    const newUser = await User.create({
      fullName,
      userName,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
      user: newUser, 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};




//login body

export const login = async (req, res) => {
  try {
    const {  userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    };
    //chechk user exist
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ 
        message: "Incorrect User or password",
        success:false
      });
    };
    //match password
    const isPasswordMatch=await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ 
          message: "password",
          success:false
        });
      }
      //create token
      const tokenData={
        userId:user._id
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

      return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
        _id:user._id,
        userName:user.userName,
        fullName:user.fullName,
        profilePhoto:user.profilePhoto
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });

  }
}



//logout

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token","", { maxAge:0}).json({
      message:"logout successfully"
    });
  } catch (error) {
    console.error(error);
    
  }
}
