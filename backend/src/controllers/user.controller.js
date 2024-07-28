import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudniray.js";
// import { ApiError } from "../utils/ApiError.js";`
import { ApiResponse } from "../utils/ApiResponse.js";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import Address from "../models/address.model.js"

const hello = asyncHandler(async (req, res) =>{
    return res.status(201).json(
        new ApiResponse(200, "User regised Successfully")
    )
})

const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message || "Something went wrong while generating the JWT tokens");
  }
};



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

    // const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(user._id)
    //console.log("Access Token:", accessToken);
    //console.log("Refresh Token:", refreshToken);

    // if (!accessToken || !refreshToken) {
    //     throw new ApiError(500, "Failed to generate tokens.");
    // }


    const loggedInUser = await User.findById(user._id).select(" -password ")

    const options = {
        httpOnly: true,
        secure: false
    }


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
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
    return res
        .status(200)
        .json(200, req.user, "current user fetched successfully")
})






const updateAddress = async (req, res) => {
    try {
      const { userId } = req.query;
      console.log(userId);
      const { wardNumber, houseNumber, pincode } = req.body;
  
      // Validate the pincode format
      if (!/^[0-9]{6}$/.test(pincode)) {
        return res.status(400).json({ message: "Invalid pincode format." });
      }
  
      // Find the user and update the address
      const user = await User.findById(userId).populate("address");
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Update address or create a new one if it doesn't exist
      let address;
      if (user.address) {
        address = await Address.findByIdAndUpdate(
          user.address._id,
          { wardNumber, houseNumber, pincode },
          { new: true }
        );
      } else {
        address = new Address({ wardNumber, houseNumber, pincode });
        await address.save();
        user.address = address._id;
        await user.save();
      }
  
      res.status(200).json({ message: "Address updated successfully.", address });
    } catch (error) {
      res.status(500).json({ message: error.message || "Internal server error.", error });
    }
  };

export { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getCurrentUser, 
    passwordChange, 
    refreshAccessToken,
    hello,
    updateAddress
};