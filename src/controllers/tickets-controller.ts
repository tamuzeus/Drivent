import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const enrollmentWithAddress = await ticketsService.getUserIdTicket(userId);
    return res.status(httpStatus.OK).send(enrollmentWithAddress);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const enrollmentWithAddress = await ticketsService.getFindTickets();
    return res.status(httpStatus.OK).send(enrollmentWithAddress);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { ticketTypeId } = req.body;

  if(!ticketTypeId) {
    return res.sendStatus(httpStatus.BAD_REQUEST); //400 BAD_REQUEST
  }

  try {
    const enrollmentWithAddress = await ticketsService.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(enrollmentWithAddress); //201 CREATED
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
