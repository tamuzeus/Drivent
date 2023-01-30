import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId;
  const { userId } =  req;
  
  try {
    const ticketIdInNumber = Number(ticketId);

    if(!ticketIdInNumber) {
      res.sendStatus(httpStatus.BAD_REQUEST); //Erro 400
    }

    const payments = await paymentsService.getPaymentId(ticketIdInNumber, userId);
    if(!payments) {
      res.sendStatus(httpStatus.NOT_FOUND); //Erro 404
    }

    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postPaymentProcess(req: AuthenticatedRequest, res: Response) {
  const { userId } =  req;
  
  try {
    const {
      ticketId,
      cardData
    } = req.body;

    if(!ticketId) {
      res.sendStatus(httpStatus.BAD_REQUEST); 
    }
    if(!cardData) {
      res.sendStatus(httpStatus.BAD_REQUEST); 
    }

    const payments = await paymentsService.paymentPost(ticketId, cardData, userId);
    if(!payments) {
      res.sendStatus(httpStatus.BAD_REQUEST); 
    }

    // const paymentSend = {
    //   ...payments,
    //   cardLastDigits: payments.cardLastDigits
    //   }
    // }

    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
