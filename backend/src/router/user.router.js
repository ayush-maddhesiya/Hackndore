import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { 
    loginUser, 
    logoutUser, 
    registerUser,
    refreshAccessToken,
    passwordChange,
    getCurrentUser,
    hello,
    updateAddress
} from "../controllers/user.controller.js";

import {
    getUsersByWardNumber
} from "../controllers/address.controller.js"
import { veriftyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)
router.route("/hello").get(hello)

//secured routes
router.route("/logout").post(veriftyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(veriftyJWT,passwordChange)
router.route("/current-user").get(veriftyJWT,getCurrentUser)
router.route("/updateAddress").get(veriftyJWT,updateAddress)
router.route("/getUsersByWardNumber").get(veriftyJWT,getUsersByWardNumber)


export default router;