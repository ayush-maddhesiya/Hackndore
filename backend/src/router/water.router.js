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
router.route("/createWaterTax").post(  createWaterTax)
router.route("/getWaterTaxById").get(  getWaterTaxById)
router.route("/updateWaterTax").patch(  updateWaterTax)
//add data every month
router.route("/addBillInfo").put(  addBillInfo)


export default router;