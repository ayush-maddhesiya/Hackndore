import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudniray.js";
// import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Jwt from "jsonwebtoken";
import sendWelcomeEmail from "./email.controlller.js";
import mongoose from "mongoose";

const hello = asyncHandler(async (req, res) =>{
    return res.status(201).json(
        new ApiResponse(200, "User regised Successfully")
    )
})

const generateAccessTokenandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { refreshToken, accessToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the JWT tokens")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, mobile, password,aadhar,pan } = req.body;


    if ([fullName, email, mobile, password,pan,aadhar].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ pan }, { aadhar }]
    });

    if (existingUser) {
        throw new ApiError(409, "Aadhar or Pan already exists!");
    }


    const user = await User.create({
        fullName,
        email,
        password,
        pan,
        aadhar,
        mobile
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    sendWelcomeEmail(email)
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User regised Successfully")
    )
    // Here you can proceed with saving the user to the database or performing other operations
});


const loginUser = asyncHandler(async (req, res) => {
    const { aadhar, mobile, password } = await req.body;

    if (!aadhar && !mobile) {
        throw new ApiError(400, "Aadhar or mobile is required")
    }

    const user = await User.findOne({
        $or: [{ aadhar }, { mobile }]
    })

    if (!user) {
        throw new ApiError(404, "User not found in this database you probably not registed properly")
    }

    const isPasswordCorrectt = await user.isPasswordCorrect(password);

    if (!isPasswordCorrectt) {
        throw new ApiError(401, "User Credincial is wrong")
    }

    const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(user._id)
    //console.log("Access Token:", accessToken);
    //console.log("Refresh Token:", refreshToken);

    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "Failed to generate tokens.");
    }


    const loggedInUser = await User.findById(user._id).select(" -refreshToken -password ")

    const options = {
        httpOnly: true,
        secure: false
    }


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, {
        $unset: {
            refreshToken: 1
        }
    },

        {
            new: true
        }

    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out"))

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incommingAccessToken = res.cookies.accessToken || res.body.accessToken;

        if (!incommingAccessToken) {
            throw new ApiError(401, "Unautherzied Token")
        }

        const decodedToken = Jwt.verify(incommingAccessToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid Refresh token")
        }

        if (incommingAccessToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is Expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    "Accessed token and refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh Token")
    }

})

const passwordChange = asyncHandler(async (req, res) => {   
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invaid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const  user  = req.user;
    console.log(user);
    return res
        .status(200)
        .json(new ApiResponse(200,{ user }, "current user fetched successfully"))
})





export { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getCurrentUser, 
    passwordChange, 
    refreshAccessToken,
    hello
};