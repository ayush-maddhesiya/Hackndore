import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  wardNumber: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
    match: /^[0-9]{6}$/, // Must be a 6-digit number
  },
});

export default mongoose.model("Address", addressSchema);
