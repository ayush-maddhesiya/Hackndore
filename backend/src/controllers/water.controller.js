
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'; 
import {ApiResponse} from '../utils/ApiResponse.js'; 
import { WaterTax } from '../models/watertax.model.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new water tax entry
// Create a new water tax entry
const createWaterTax = asyncHandler(async (req, res) => {
  try {
    const { user, billinfo } = req.body;

    // Generate unique bill numbers for each billinfo entry
    const updatedBillInfo = billinfo.map(entry => ({
      ...entry,
      billNumber: `WTX${uuidv4().slice(0, 5).toUpperCase()}`
    }));

    const waterTax = new WaterTax({
      user,
      billinfo: updatedBillInfo
    });

    await waterTax.save();
    return res
      .status(201)
      .json(new ApiResponse(201, waterTax, "Water tax entry created successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Internal error createWaterTax");
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
  const waterTax = await WaterTax.findById(req.query.id);
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
    { new: true }
  );
  if (!waterTax) {
    throw new ApiError(404, "Water tax entry not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, waterTax, "Water tax entry updated successfully"));
});

// Update billinfo for a specific water tax entry
//add billinfo

// Add a new billinfo entry for a specific water tax entry
const addBillInfo = asyncHandler(async (req, res) => {
  const { id, newBillInfo } = req.body;

  const waterTax = await WaterTax.findById(id);
  if (!waterTax) {
    throw new ApiError(404, "Water tax entry not found");
  }

  // Generate a unique bill number
  const billNumber = `WTX${uuidv4().slice(0, 5).toUpperCase()}`;

  // Add new billinfo entry
  waterTax.billinfo.push({ ...newBillInfo, billNumber });
  await waterTax.save();

  return res.status(200).json(new ApiResponse(200, waterTax, "Bill info added successfully"));
});


export {
  createWaterTax,
  getAllWaterTaxes,
  getWaterTaxById,
  updateWaterTax,
  addBillInfo
};
