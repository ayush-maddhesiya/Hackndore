import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { 
    loginUser, 
    logoutUser, 
    registerUser,
    refreshAccessToken,
    passwordChange,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getHistory,
    getUserChannelProfile,
    hello
} from "../controllers/user.controller.js";
import { veriftyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ])
    ,registerUser)

router.route("/login").post(loginUser)
router.route("/hello").get(hello)

//secured routes
router.route("/logout").post(veriftyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(veriftyJWT,passwordChange)
router.route("/current-user").get(veriftyJWT,getCurrentUser)
router.route("/update-account").patch(veriftyJWT,updateAccountDetails)

router.route("/avatar").patch(veriftyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/cover-image").patch(veriftyJWT,upload.single("coverImage"),updateUserCoverImage)

router.route("/c/:username").get(veriftyJWT,getUserChannelProfile)
router.route("/history").get(veriftyJWT,getHistory)

export default router;