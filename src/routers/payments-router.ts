import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPayment, postPaymentProcess } from "@/controllers";

const paymentsRouter = Router();
paymentsRouter
  .all("/*", authenticateToken)
  .get("", getPayment)
  .post("/process", postPaymentProcess);

export { paymentsRouter };
