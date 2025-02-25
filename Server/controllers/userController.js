import userModel from "../models/userModel.js"
import { comparePassword,createHashPassword  } from "../utils/bcrypt.js"
import { createToken } from "../utils/jwt.js"

export const userSignup=async (req,res)=>{
    try{
        let user =req.body
        let {firstName,email,password}= user
        if(firstName && email && password){
            let hashedPassword= await createHashPassword(password)
             let userData= new userModel({...user,password:hashedPassword})
             let response= await userData.save()
             let token=createToken({id:response._id})
             return res.status(201).send({token})
        }else{
            return res.status(400).send({error:"Provide all required field"})
        }
    }
    catch(error){
        res.status(500).send({error:"Internal Server error",msg: error.message})
    }
}


export const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(email&&password){
            const user=await userModel.findOne({email})
            if(user){
                const isMatched=comparePassword(password,user.password)
                if(isMatched){
                    let token=createToken({id:user._id})
                    let name={name:user.firstName}
                    return res.status(200).send({message:"login succesful",token,name})
                }else{
                    return res.status(400).send({error:"password not matched"})
                }
            }else{
                return res.status(400).send({error:"user not registered"})
            }

        }else{
            return res.status(400).send({error:"provided all finds"})
        }
    }catch(error){
        return res.status(500).send({error:"internal server error",msg:error.message})
    }
}

export const getUser=async(req,res)=>{
    try{
        const { id } =req
        const userData=await userModel.findById(id,{_id:0,__v:0,password:0})
        return res.status(200).send({userData})
        
    }catch (error){
        return res.status(500).send({error:"internal server error",msg:error.message})
    }
}

export const updateUser=async(req,res)=>{
    try{
        const {id}=req
        const data=req.body
        // delete data.password
        // delete data.email
        const response=await userModel.findByIdAndUpdate(id,{$set:{...data}})
        if(response){
            return res.status(200).send({message:"userdata update"})
        }else{
            return res.status(400).send({message:"user not found"})
        }
    }catch(error){
        return res.status(500).send({error:"internal server error",msg:error.message})
    }
}

export const deleteUser=async(req,res)=>{
    try {
        const {id}=req
        const response=await userModel.findByIdAndDelete(id)
        if(response){
            return res.status(200).send({message:"userData is deleted"})
        }else{
            return res.status(400).send({message:"userData is not found"})
        }
    } catch (error) {
return res.status(500).send({error:"internal server error",msg:error.message})
    }
}

