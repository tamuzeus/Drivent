import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { CardPayments, PaymentObj } from "@/protocols";

async function getPaymentId(id: number, userId: number) {
  const ticket = await ticketRepository.findTicketsId(id);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollmentId = ticket.enrollmentId;
  if (!enrollmentId) {
    throw notFoundError();
  }

  const enrollmentFind = await enrollmentRepository.findByEnrollmentUserId(ticket.enrollmentId);
  if(enrollmentFind.userId !== userId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.findPayments(id);
  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function paymentPost(ticketId: number, cardData: CardPayments, userId: number) {
  const ticket = await ticketRepository.findTicketsTypesById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollmentId = ticket.enrollmentId;
  if (!enrollmentId) {
    throw notFoundError();
  }

  const enrollmentFind = await enrollmentRepository.findByEnrollmentUserId(ticket.enrollmentId);
  if(enrollmentFind.userId !== userId) {
    throw unauthorizedError();
  }

  const paymentCardData: PaymentObj = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().substring(11)
  };

  const payments = await paymentsRepository.createPayments(ticketId, paymentCardData);
  if (!payments) {
    throw notFoundError();
  }

  const paymentPaid = await paymentsRepository.paymentPaid(ticketId);
  if (!paymentPaid) {
    throw notFoundError();
  }

  return payments;
}

const paymentsService = {
  getPaymentId, paymentPost
};

export default paymentsService;
