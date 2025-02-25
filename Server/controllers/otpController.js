import { otpModel } from "../models/otpModel.js"
import userModel from "../models/userModel.js"
import { sendOtpMail } from "../utils/nodemailer.js"
import { generateOTP } from "../utils/otp.js"



export const forgetPassword=async(req,res)=>{
    try {
        const {email}=req.body
        const response=await userModel.findOne({email})
        if(response){
            const otp=generateOTP()
            const isUser=await otpModel.findOne({email})
            if(isUser){
               await otpModel.updateOne({email},{$set:{otp}})
               await sendOtpMail(email,otp)
            }else{
                let otpData=new otpModel({email,otp})
                await otpData.save()
                await sendOtpMail(email,otp)
            }
            return res.status(200).send({message:"otp generated"})
        }else{
            return res.status(400).send({message:"user is not resistated"})
        }
    } catch (error) {
        return res.status(500).send({error:"internal server error",msg:error.message})
    }
}