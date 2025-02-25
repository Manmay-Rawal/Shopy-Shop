import express from "express";
import userModel from "../models/userModel.js";
import { deleteUser, updateUser, userSignup,getUser,userLogin } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/jwt.js";
import {forgetPassword} from "../controllers/otpController.js"

const userRouter=express.Router()


//APIs
userRouter.get("/",(req,res)=>res.send("user router is working"))

userRouter.get("/all",async(req,res)=>{
    let allUsers=await userModel.find()
    res.status(200).send(allUsers)
})


// user signup
userRouter.post("/signup",userSignup)

// user login
userRouter.post("/login",userLogin)

// get user (Auth Tocken)
userRouter.get("/auth",verifyToken,getUser)

// update user(auth token)
userRouter.put("/update",verifyToken,updateUser)

// delete user data(auth token)
userRouter.delete("/delete",verifyToken,deleteUser)

//forget password
userRouter.post("/password",forgetPassword)

export default userRouter