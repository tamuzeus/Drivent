import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const bookingWithId = await bookingService.searchBooking(userId);
    return res.status(httpStatus.OK).send({
      id: bookingWithId.id,
      Room: bookingWithId.Room
    });
  } catch (error) {
    console.log(error.name);
    if(error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { roomId } = req.body;

    if(!roomId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const tryBooking = await bookingService.findBookRoom(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: tryBooking.id });
  } catch (error) {
    if(error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

