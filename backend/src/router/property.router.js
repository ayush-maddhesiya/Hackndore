import { Router } from "express";
import {
  createPropertyTax,
  getAllPropertyTaxes,
  getPropertyTaxById,
  updatePropertyTax
} from "../controllers/property.controller.js";
import { veriftyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getAllPropertyTaxes").get(getAllPropertyTaxes)

//secured routes
router.route("/createPropertyTax").post(  createPropertyTax)
router.route("/getPropertyTaxById").get(  getPropertyTaxById)
router.route("/updatePropertyTax").get(  updatePropertyTax)


export default router;