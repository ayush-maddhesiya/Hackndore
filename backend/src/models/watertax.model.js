import mongoose, { Schema } from "mongoose";

// Water Tax Schema
const waterTaxSchema = new Schema({
  billNumber: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  lastDate: {
    type: Date,
    required: true,
  },
  unitUsed: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export const WaterTax = mongoose.model("WaterTax", waterTaxSchema);