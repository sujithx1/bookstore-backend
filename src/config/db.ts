


import mongoose from "mongoose";



export const db =()=>{
    mongoose.connect(process.env.MONGO_URL!)
    .then(()=>console.log('Mongo DB Connected...'))
    .catch((err)=>console.error(err))
}

