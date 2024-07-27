import mongoose, { Schema } from "mongoose";
// Property Tax Schema
const propertyTaxSchema = new Schema({
  billNo: {
    type: String,
    required: true,
    unique: true,
  },
  propertyId: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  typeOfProperty: {
    type: String,
    enum: ['commercial', 'residential'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  fromWhichYear: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export const PropertyTax = mongoose.model("PropertyTax", propertyTaxSchema);