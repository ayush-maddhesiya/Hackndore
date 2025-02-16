import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        aadhar: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        pan: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        water_tax: {
            type: Schema.Types.ObjectId,
            ref: "WaterTax",
            totalAmount: Number
        },
        garbage_tax: {
            type: Schema.Types.ObjectId,
            ref: "GarbageTax",
            totalAmount: Number
        },
        property_tax: {
            type: Schema.Types.ObjectId,
            ref: "PropertyTax",
            totalAmount: Number
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        address:{
            type:Schema.Types.ObjectId,
            ref:"Address",
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return Jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    },~
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return Jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)