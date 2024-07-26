import {asyncHandler} from '../utils/asyncHandler';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import { PropertyTax } from '../models/propertytax.model.js';

// Create a new property tax entry
const createPropertyTax = asyncHandler(async (req, res) => {
  const propertyTax = new PropertyTax(req.body);
  await propertyTax.save();
  return res
    .status(201)
    .json(new ApiResponse(201, propertyTax, "Property tax entry created successfully"));
});

// Read all property tax entries
const getAllPropertyTaxes = asyncHandler(async (req, res) => {
  const propertyTaxes = await PropertyTax.find();
  return res
    .status(200)
    .json(new ApiResponse(200, propertyTaxes, "Property tax entries retrieved successfully"));
});

// Read a specific property tax entry by ID
const getPropertyTaxById = asyncHandler(async (req, res) => {
  const propertyTax = await PropertyTax.findById(req.params.id);
  if (!propertyTax) {
    throw new ApiError(404, "Property tax entry not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, propertyTax, "Property tax entry retrieved successfully"));
});

// Update a specific property tax entry by ID
const updatePropertyTax = asyncHandler(async (req, res) => {
  const propertyTax = await PropertyTax.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!propertyTax) {
    throw new ApiError(404, "Property tax entry not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, propertyTax, "Property tax entry updated successfully"));
});

export {
  createPropertyTax,
  getAllPropertyTaxes,
  getPropertyTaxById,
  updatePropertyTax
};
