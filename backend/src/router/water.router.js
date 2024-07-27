import { Router } from "express";
import { 
  createWaterTax,
  getAllWaterTaxes,
  getWaterTaxById,
  updateWaterTax,
  addBillInfo
} from "../controllers/water.controller.js";
import { veriftyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getAllWaterTaxes").get(getAllWaterTaxes)

//secured routes
router.route("/createWaterTax").post(veriftyJWT, createWaterTax)
router.route("/getWaterTaxById").get(veriftyJWT, getWaterTaxById)
router.route("/updateWaterTax").patch(veriftyJWT, updateWaterTax)
//add data every month
router.route("/addBillInfo").put(veriftyJWT, addBillInfo)


export default router;