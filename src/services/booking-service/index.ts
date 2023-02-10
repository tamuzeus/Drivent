import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, ForbiddenError } from "@/errors";

async function searchBooking(userId: number) {
  const bookingByUserId = await bookingRepository.findWithUserId(userId);
  if (!bookingByUserId) {
    throw notFoundError();
  }
  return bookingByUserId;
}

//diminuir repetição das linhas  **

async function validationEnrollmentandTicket(userId: number,) {
  const enrollmentByUserId = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentByUserId) {
    throw ForbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentByUserId.id);
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw ForbiddenError();
  }
}  

async function validationRoom(roomId: number) {
  const roomById = await bookingRepository.findRoom(roomId);
  const bookingByRoom = await bookingRepository.findRoomById(roomId);

  if (roomById.capacity <= bookingByRoom.length) {
    throw ForbiddenError();
  }
}
// **

async function findBookRoom(userId: number, roomId: number) {
  await validationEnrollmentandTicket(userId);
  await validationRoom(roomId);

  return bookingRepository.createBooking({ roomId, userId });
}

async function updateBooking(userId: number, roomId: number) {
  await validationRoom(roomId);
  
  const bookingConfirmation = await bookingRepository.findWithUserId(userId);
  if (!bookingConfirmation) {
    throw ForbiddenError();
  }

  return bookingRepository.uptadedBooking({ roomId, id: bookingConfirmation.id });
}

const bookingService = {
  searchBooking, findBookRoom, updateBooking
};

export default bookingService;
