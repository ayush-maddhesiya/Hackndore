import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
  

const connectDB = async ()=>{
    try {
        const connectionIntance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`Mongo Connnect !!!!`);
    } catch (error) {
        console.log("Mongo not connect !!",error);
        process.exit(1)
    }
    
}


export default connectDB;