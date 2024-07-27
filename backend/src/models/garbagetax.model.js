import mongoose, { Schema } from "mongoose";

// Garbage Tax Schema
const garbageTaxSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  billinfo: [{
    billNumber: {
      type: String,
      required: true,
      unique: true,
    },
    month: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
    },
  }],
}, {
  timestamps: true,
});

export const GarbageTax = mongoose.model("GarbageTax", garbageTaxSchema);