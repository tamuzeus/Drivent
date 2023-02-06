import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotel, getHotelById } from "@/controllers";

const hotelRouter = Router();

hotelRouter
  .all("/*", authenticateToken)
  .get("/", getHotel)
  .get("/:hotelId", getHotelById);
export { hotelRouter };
