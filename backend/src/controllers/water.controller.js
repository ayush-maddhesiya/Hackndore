import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js'; // Replace with your error utility
import ApiResponse from '../utils/ApiResponse.js'; // Replace with your response utility
import { WaterTax } from '../models/watertax.model.js';
import uploadOnCloudinary from '../utils/cloudniray.js'; // Replace with your cloudinary utility

// Create a new water tax entry
const createWaterTax = asyncHandler(async (req, res) => {
  try {
    const waterTax = new WaterTax(req.body);
    await waterTax.save();
    return res
      .status(201)
      .json(new ApiResponse(201, waterTax, "Water tax entry created successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Internal error createWaterTax")
  }
});

// Read all water tax entries
const getAllWaterTaxes = asyncHandler(async (req, res) => {
  const waterTaxes = await WaterTax.find();
  return res
    .status(200)
    .json(new ApiResponse(200, waterTaxes, "Water tax entries retrieved successfully"));
});

// Read a specific water tax entry by ID
const getWaterTaxById = asyncHandler(async (req, res) => {
  const waterTax = await WaterTax.findById(req.params.id);
  if (!waterTax) {
    throw new ApiError(404, "Water tax entry not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, waterTax, "Water tax entry retrieved successfully"));
});

// Update a specific water tax entry by ID
const updateWaterTax = asyncHandler(async (req, res) => {
  const waterTax = await WaterTax.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!waterTax) {
    throw new ApiError(404, "Water tax entry not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, waterTax, "Water tax entry updated successfully"));
});

export {
  createWaterTax,
  getAllWaterTaxes,
  getWaterTaxById,
  updateWaterTax
};
