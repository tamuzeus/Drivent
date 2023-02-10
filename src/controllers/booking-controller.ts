import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";
import { ForbiddenError } from "@/errors";

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
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

async function roomIdValidation(roomId: number) {
  if(!roomId) {
    throw ForbiddenError();
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { roomId } = req.body;
    await roomIdValidation(roomId);

    const tryBooking = await bookingService.findBookRoom(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: tryBooking.id });
  } catch (error) {
    if(error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { roomId } = req.body;
    await roomIdValidation(roomId);

    const tryBooking = await bookingService.updateBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: tryBooking.id });
  } catch (error) {
    if(error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

