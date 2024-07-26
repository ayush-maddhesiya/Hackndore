//require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import app from './app.js'

import connectDB from "./db/index.js";
dotenv.config({
    path: './.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT ,()=>{
        console.log(`Server is lintening on port : ${process.env.PORT}`);

    })
})
.catch((error)=>{
    console.error("Mongoose contion failed",error)
})
