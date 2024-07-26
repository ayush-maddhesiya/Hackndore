
// Garbage Tax Schema
const garbageTaxSchema = new Schema({
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
}, {
  timestamps: true,
});

export const GarbageTax = mongoose.model("GarbageTax", garbageTaxSchema);