import express from "express"
import { Authentication } from "../middleware/Authentication"
import { admincontroller } from "../../di/admin.di"


const adminrouter=express.Router()

    
adminrouter.get('/users',Authentication,(req,res,next)=>{

    admincontroller.getallusers(req,res,next)})
    
adminrouter.delete('/users/:userId/:isActive',Authentication,(req,res,next)=>{
    admincontroller.deleteuser(req,res,next)})
    
adminrouter.get('/orders',Authentication,(req,res,next)=>{
    admincontroller.getallorders(req,res,next)})
adminrouter.get('/books',Authentication,(req,res,next)=>{
    admincontroller.getallbooks(req,res,next)})
adminrouter.get('/sales-history',Authentication,(req,res,next)=>{
    admincontroller.salesHistory(req,res,next)})

    export{adminrouter}