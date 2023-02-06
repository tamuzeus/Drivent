import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotel } from "@/controllers";

const hotelRouter = Router();

hotelRouter
  .all("/*", authenticateToken)
  .get("/", getHotel);

export { hotelRouter };
