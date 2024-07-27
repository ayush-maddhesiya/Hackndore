import Express  from "express";
const app = Express();
import cookieParser from "cookie-parser";
import cors from 'cors'

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(Express.json({ limit: "16kb"}))
app.use(Express.urlencoded({extended: true, limit : "16kb"}))
app.use(Express.static("public"))
app.use(cookieParser())


//router import 
import userRoute from "./router/user.router.js"
import waterRoute from "./router/water.router.js"
import garbageRoute from "./router/garbage.router.js"
import propertyRoute from "./router/property.router.js"

//router declartion:
app.use("/api/v1/users",userRoute)
app.use("/api/v1/water", waterRoute)
app.use("/api/v1/garbage",garbageRoute)
app.use("/api/v1/",propertyRoute)

export default app;