import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import  ticketRepository  from "@/repositories/tickets-repository";
import { TicketStatus } from "@prisma/client";

async function getUserIdTicket(id: number) {
  const idTicket = await enrollmentRepository.findWithAddressByUserId(id);
  if(!idTicket) {
    throw notFoundError();
  }
  const enrollment = await ticketRepository.findEnrollmentId(idTicket.id);
  if(!enrollment) {
    throw notFoundError();
  }
  return enrollment;
}

async function getFindTickets() {
  const tickets = ticketRepository.findTickets();
  if(!tickets) {
    throw notFoundError();
  }
  return tickets;
}

async function createTicket(id: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(id);
  if(!enrollment) {
    throw notFoundError();
  }
  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED
  };
  await ticketRepository.postCreateTicket(ticketData);
  const ticket = await ticketRepository.findEnrollmentId(enrollment.id);
  return ticket;
}

const ticketsService = {
  getFindTickets, getUserIdTicket, createTicket
};

export default ticketsService;
