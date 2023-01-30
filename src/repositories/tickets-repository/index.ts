import { prisma } from "@/config";
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

async function findTicketsId(id: number) {
  return prisma.ticket.findFirst({
    where: { 
      id: id
    },
    include: { Enrollment: true }
  });
}

async function findTicketsTypesById(id: number) {
  return prisma.ticket.findFirst({
    where: { 
      id: id
    },
    include: { TicketType: true }
  });
}

async function postCreateTicket(ticket: CreateTicket) {
  return prisma.ticket.create({ data: { ...ticket, } });
}

const ticketRepository = {
  findEnrollmentId, findTickets, postCreateTicket, findTicketsId, findTicketsTypesById
};

export default ticketRepository;
