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
router.route("/createGarbageTax").post(veriftyJWT, createGarbageTax);
router.route("/getGarbageTaxById").get(veriftyJWT, getGarbageTaxById);
router.route("/updateGarbageTax").patch(veriftyJWT, updateGarbageTax);
// Add data every month
router.route("/addBillInfo").put(veriftyJWT, addBillInfo);

export default router;
