

import User from "../models/userModel.js"; 
import bcrypt from "bcryptjs";

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
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

   
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
