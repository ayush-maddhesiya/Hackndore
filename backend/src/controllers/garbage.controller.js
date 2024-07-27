import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { GarbageTax } from '../models/garbagetax.model.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new garbage tax entry
const createGarbageTax = asyncHandler(async (req, res) => {
  try {
    const { user, billinfo } = req.body;

    // Generate unique bill numbers for each billinfo entry
    const updatedBillInfo = billinfo.map(entry => ({
      ...entry,
      billNumber: `GTX${uuidv4().slice(0, 5).toUpperCase()}`
    }));

    const garbageTax = new GarbageTax({
      user,
      billinfo: updatedBillInfo
    });

    await garbageTax.save();
    return res
      .status(201)
      .json(new ApiResponse(201, garbageTax, "Garbage tax entry created successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Internal error createGarbageTax");
  }
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
  const garbageTax = await GarbageTax.findById(req.query.id);
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
    { new: true }
  );
  if (!garbageTax) {
    throw new ApiError(404, "Garbage tax entry not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, garbageTax, "Garbage tax entry updated successfully"));
});

// Add a new billinfo entry for a specific garbage tax entry
const addBillInfo = asyncHandler(async (req, res) => {
  const { id, newBillInfo } = req.body;

  const garbageTax = await GarbageTax.findById(id);
  if (!garbageTax) {
    throw new ApiError(404, "Garbage tax entry not found");
  }

  // Generate a unique bill number
  const billNumber = `GTX${uuidv4().slice(0, 5).toUpperCase()}`;

  // Add new billinfo entry
  garbageTax.billinfo.push({ ...newBillInfo, billNumber });
  await garbageTax.save();

  return res.status(200).json(new ApiResponse(200, garbageTax, "Bill info added successfully"));
});

export {
  createGarbageTax,
  getAllGarbageTaxes,
  getGarbageTaxById,
  updateGarbageTax,
  addBillInfo
};
