import { Router } from "express";
import {
  createPropertyTax,
  getAllPropertyTaxes,
  getPropertyTaxById,
  updatePropertyTax
} from "../controllers/water.controller.js";
const router = Router();

router.route("/getAllPropertyTaxes").get(getAllPropertyTaxes)

//secured routes
router.route("/createPropertyTax").post(veriftyJWT, createPropertyTax)
router.route("/getPropertyTaxById").get(veriftyJWT, getPropertyTaxById)
router.route("/updatePropertyTax").get(veriftyJWT, updatePropertyTax)


export default router;