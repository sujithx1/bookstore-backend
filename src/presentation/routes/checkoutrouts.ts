

import express from "express"
import { checkoutcontroller } from "../../di/checkout.di"
import { Authentication } from "../middleware/Authentication"




const checkoutrouter=express.Router()


checkoutrouter.post('/',Authentication,(req,res,next)=>{

    checkoutcontroller.checkoutpost(req,res,next)

})
checkoutrouter.post('/order',Authentication,(req,res,next)=>{
    checkoutcontroller.create_orderRazorpay(req,res,next)

})



export {checkoutrouter}


