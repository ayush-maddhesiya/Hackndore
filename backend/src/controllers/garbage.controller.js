import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { GarbageTax } from '../models/garbagetax.model.js';

// Create a new garbage tax entry
const createGarbageTax = asyncHandler(async (req, res) => {
  const garbageTax = new GarbageTax(req.body);
  await garbageTax.save();
  return res
    .status(201)
    .json(new ApiResponse(201, garbageTax, "Garbage tax entry created successfully"));
});

// Read all garbage tax entries
const getAllGarbageTaxes = asyncHandler(async (req, res) => {
  const garbageTaxes = await GarbageTax.find();
  return res
    .status(200)
    .json(new ApiResponse(200, garbageTaxes, "Garbage tax entries retrieved successfully"));
});

// Read a specific garbage tax entry by ID
const getGarbageTaxById = asyncHandler(async (req, res) => {
  const garbageTax = await GarbageTax.findById(req.params.id);
  if (!garbageTax) {
    throw new ApiError(404, "Garbage tax entry not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, garbageTax, "Garbage tax entry retrieved successfully"));
});

// Update a specific garbage tax entry by ID
const updateGarbageTax = asyncHandler(async (req, res) => {
  const garbageTax = await GarbageTax.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!garbageTax) {
    throw new ApiError(404, "Garbage tax entry not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, garbageTax, "Garbage tax entry updated successfully"));
});

export {
  createGarbageTax,
  getAllGarbageTaxes,
  getGarbageTaxById,
  updateGarbageTax
};
