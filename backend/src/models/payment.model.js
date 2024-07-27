import mongoose, { Schema } from "mongoose";
const paymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  billNumber:{
    type: String,
    required:true
  },
  bill: {
    type: String,
    enum: ["watertax","propertytax","garbagetax"],
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export const Payment = mongoose.model("Payment", paymentSchema);
