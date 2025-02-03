import express from "express";
import { logout,login,register } from "../controllers/userController.js";


const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);


export default router;