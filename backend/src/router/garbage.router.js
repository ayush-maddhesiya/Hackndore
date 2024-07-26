import { Router } from "express";
import {
  createGarbageTax,
  getAllGarbageTaxes,
  getGarbageTaxById,
  updateGarbageTax
} from "../controllers/water.controller.js";
const router = Router();

router.route("/getAllGarbageTaxes").get(getAllGarbageTaxes)

//secured routes
router.route("/createGarbageTax").post(veriftyJWT, createGarbageTax)
router.route("/getGarbageTaxById").get(veriftyJWT, getGarbageTaxById)
router.route("/updateGarbageTax").get(veriftyJWT, updateGarbageTax)


export default router;