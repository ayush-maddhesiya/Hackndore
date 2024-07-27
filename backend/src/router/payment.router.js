import { Router } from "express";
import {
  createPayment,
  getAllPendingPayments,
  getAllPaidPayments,
  getTotalPaidAmount
} from "../controllers/payment.controller.js";
import { veriftyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/getAllPendingPayments").get( getAllPendingPayments)
router.route("/getAllPaidPayments").get( getAllPaidPayments)
router.route("/getTotalPaidAmount").get( getTotalPaidAmount)

//secured routes
router.route("/createPayment").post(veriftyJWT, createPayment)


export default router;