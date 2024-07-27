import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Payment } from '../models/payment.model.js';

// Create a new payment entry
const payAmount = asyncHandler(async (req, res) => {
  const { paymentAmount, billno } = req.body;

  const payment = await Payment.findOneAndUpdate(
    { billNumber: billno },
    { $inc: { amountPaid: paymentAmount } },
    { new: true, upsert: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(201, payment, "Payment entry created successfully"));
});


const createPayment = asyncHandler(async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  return res
    .status(201)
    .json(new ApiResponse(201, payment, "Payment entry created successfully"));
});




// Get all pending payments
const getAllPendingPayments = asyncHandler(async (req, res) => {
  const pendingPayments = await Payment.find({ amountPaid: { $lt: 1 } });
  return res
    .status(200)
    .json(new ApiResponse(200, pendingPayments, "Pending payments retrieved successfully"));
});

// Get all paid payments
const getAllPaidPayments = asyncHandler(async (req, res) => {
  const paidPayments = await Payment.find({ amountPaid: { $gt: 0 } });
  return res
    .status(200)
    .json(new ApiResponse(200, paidPayments, "Paid payments retrieved successfully"));
});

export {
  createPayment,
  getAllPendingPayments,
  getAllPaidPayments
};
