import { Router } from "express";
import { 
  createGarbageTax,
  getAllGarbageTaxes,
  getGarbageTaxById,
  updateGarbageTax,
  addBillInfo
} from "../controllers/garbage.controller.js";
import { veriftyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getAllGarbageTaxes").get(getAllGarbageTaxes);

// Secured routes
router.route("/createGarbageTax").post(  createGarbageTax);
router.route("/getGarbageTaxById").get(  getGarbageTaxById);
router.route("/updateGarbageTax").patch(  updateGarbageTax);
// Add data every month
router.route("/addBillInfo").put(  addBillInfo);

export default router;
