// import { Error } from "mongoose"
import nodemailer from "nodemailer"
import { config } from "dotenv"
config()

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_ADD,
        pass:process.env.EMAIL_PASS
    }
})

export const sendOtpMail= async (to,otp)=>{
   try {
    const mailOptions={
        from:process.env.EMAIL_ADD,
        to,
        sub:"otp from the mern project",
        text:`hey, the otp of mern project is ${otp} will expire in 5min, don't share your otp with unknown resources`
    }
    console.log(mailOptions)
    await transport.sendMail(mailOptions)
   } catch (error) {
        return new Error("error while sending mail")
   }
}