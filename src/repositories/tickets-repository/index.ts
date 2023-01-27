import { prisma } from "@/config";
import { notFoundError } from "@/errors";
import { CreateTicket } from "@/protocols";

async function findEnrollmentId(enrollmentId: number) {
  const ticket = prisma.ticket.findFirst({
    where: { enrollmentId },
    include: { TicketType: true }
  });

  return ticket;
}

async function findTickets() {
  return prisma.ticketType.findMany();
}

async function postCreateTicket(ticket: CreateTicket) {
  return prisma.ticket.create({ data: { ...ticket, } });
}

const ticketRepository = {
  findEnrollmentId, findTickets, postCreateTicket
};

export default ticketRepository;
