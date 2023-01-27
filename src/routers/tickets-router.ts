import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTypes, getTickets, postTicket } from "@/controllers";

const ticketsRouter = Router();
ticketsRouter
  .all("/*", authenticateToken)
  .get("", getTickets)
  .get("/types", getTypes)
  .post("", postTicket);

export { ticketsRouter };
