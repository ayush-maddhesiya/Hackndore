import mongoose, { Schema } from "mongoose";

// Water Tax Schema
const waterTaxSchema = new Schema({
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
    Date: {
      type: Date,
      required: true,
    },
    unitUsed: {
      type: Number,
      required: true,
    }
  },],
}, {
  timestamps: true,
});

export const WaterTax = mongoose.model("WaterTax", waterTaxSchema);