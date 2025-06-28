


import express from "express"
import { Authentication } from "../middleware/Authentication"
import { bookcontroller } from "../../di/book.di"


const router=express.Router()

router.post('/',Authentication,(req,res,next)=>{
    bookcontroller.create(req,res,next)
})
router.put('/:id',Authentication,(req,res,next)=>{
    bookcontroller.update(req,res,next)
})
router.delete('/:id/:isActive',Authentication,(req,res,next)=>{
    bookcontroller.delete(req,res,next)
})
router.get('/authorId/:authorId',Authentication,(req,res,next)=>{
    bookcontroller.getbooksbyAuthorId(req,res,next)
})
router.get('/all',Authentication,(req,res,next)=>{
    bookcontroller.getallBooks(req,res,next)
})
router.get('/:id',Authentication,(req,res,next)=>{
    bookcontroller.getbookbyid(req,res,next)
})


export default router