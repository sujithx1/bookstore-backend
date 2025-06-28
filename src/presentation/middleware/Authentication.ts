import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../types/types";
import jwt from "jsonwebtoken"
import { UserModel } from "../../infrastructor/models/usermodel";
const accessSecret=process.env.JWT_ACCESS_SECRET!

export const Authentication=(req:Request,res:Response,next:NextFunction):void=>{

    const authHeader=req.headers['authorization']
    const token=authHeader&& authHeader.split(' ')[1]
    
    if(!token)
    {
     res.status(StatusCode.UNAUTHORIZED).json({message:'Token Expired'})
     return
    }


    jwt.verify(token,accessSecret,async (err,user)=>{
    if (err) {
        console.log(err);
        
        res.status(StatusCode.FORBIDDEN).json({message:err})
        return
    }
    // const user=await UserModel.findById(decode.id)
    console.log(user);
    next()
    
   })
    

}