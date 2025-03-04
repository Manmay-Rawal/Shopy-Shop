import express  from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cros from "cors";
import dbConnect from "./db/dbConfig.js";
import userRouter from "./routes/userRouter.js";
import { userLogin, userSignup } from "./controllers/userController.js";
import path from 'path';

const app=express()

const _dirname=path.resolve();

dotenv.config();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev")) //morgen(http logger)
app.use(cros({origin:"http://localhost:5173"}))//cross server access

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});



//demoAPI
app.get("/",(req,res)=>res.send({message:"Server is start"}))



// routes
app.use("/user",userRouter)

// Signup API
userRouter.post("/signup",userSignup)


// Login API
userRouter.post("/login",userLogin)



const port = process.env.PORT || 2000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`https://shopy-shop-bsmy.onrender.com`);
    dbConnect();
});