import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import hotelService from "@/services/hotel-service";
import httpStatus from "http-status";

export async function getHotel(req: AuthenticatedRequest, res: Response) {
  const  { userId }  = req; 
  try {
    const hotels = await hotelService.reciveHotelRepository(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if(error.name === "NotFound") {
      res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}
