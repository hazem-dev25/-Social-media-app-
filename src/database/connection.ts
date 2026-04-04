import mongoose from "mongoose";
import { url } from "../config/env.service";





export const connectDB = async () => {
    mongoose.connect(url).then(()=>{
        console.log("database is connected succ");
    }).catch((error)=>{
        console.log("failed to connect database" ,error);
    })
}