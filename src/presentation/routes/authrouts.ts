






import express from "express"
import { usercontroller } from "../../di/user.di"
import { Authentication } from "../middleware/Authentication"
import { generatenewAccessToken } from "../../config/jwt"
import { authorcontroller } from "../../di/author.di"


const router=express.Router()
router.post('/refresh/:role',(req,res)=>{generatenewAccessToken(req,res)})
router.post('/login',(req,res,next)=>{
    usercontroller.login(req,res,next)
})
router.post('/signup',(req,res,next)=>{
    usercontroller.Signup(req,res,next)
})
router.post('/logout/:id',(req,res,next)=>{
    usercontroller.logout(req,res,next)
})

router.put('/user/:id',Authentication,(req,res,next)=>{
    usercontroller.update(req,res,next)})


    
router.get('/user/:id',Authentication,(req,res,next)=>{
    usercontroller.getuser(req,res,next)})

router.get('/user/orders/:userId',Authentication,(req,res,next)=>{
    usercontroller.getordersbyuserId(req,res,next)})

router.post('/address/:userId',Authentication,(req,res,next)=>{
    usercontroller.Addaddress(req,res,next)
})
router.get('/address/:userId/:addressId',Authentication,(req,res,next)=>{
    usercontroller.getaddressbyaddressid(req,res,next)
})
router.get('/user/address/:userId',Authentication,(req,res,next)=>{
    usercontroller.getaddressesbyuserId(req,res,next)
})
router.delete('/user/address/:userId/:addressId',Authentication,(req,res,next)=>{
    usercontroller.deleteuseraddress(req,res,next)
})




router.get('/author/summery/:authorId',Authentication,(req,res,next)=>{
authorcontroller.getAuthStats(req,res,next)})
router.get('/author/:authorId/recent-sales',Authentication,(req,res,next)=>{
authorcontroller.getRecentSalesController(req,res,next)})
router.get('/author/:authorId/sales-history',Authentication,(req,res,next)=>{
authorcontroller.getSalesHistory(req,res,next)})


export default router
