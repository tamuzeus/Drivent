import { prisma } from "@/config";
import { PaymentObj } from "@/protocols";
import { TicketStatus } from "@prisma/client";

async function findPayments(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });

  return; 
}

async function createPayments(ticketId: number, PaymentObj: PaymentObj) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...PaymentObj
    }
  });
}

async function paymentPaid(ticketId: number) {
  return  prisma.ticket.update({
    where: { id: ticketId },
    data: { status: TicketStatus.PAID }
  }); //tickets
}

const paymentsRepository = {
  findPayments, createPayments, paymentPaid
};

export default paymentsRepository;
