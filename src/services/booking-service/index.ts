import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, ForbiddenError } from "@/errors";

async function searchBooking(userId: number) {
  const bookingByUserId = await bookingRepository.findWithUserId(userId);
  if(!bookingByUserId) {
    throw notFoundError();
  }
  return bookingByUserId;
}

async function findBookRoom(userId: number, roomId: number) {
  const enrollmentByUserId = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollmentByUserId) {
    throw ForbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentByUserId.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw ForbiddenError();
  }

  const roomById = await bookingRepository.findRoom(roomId); 
  const bookingByRoom = await bookingRepository.findRoomById(roomId); 
  
  if(roomById.capacity <= bookingByRoom.length) {
    throw ForbiddenError();
  }

  return bookingRepository.createBooking({ roomId, userId });
}

const bookingService = {
  searchBooking, findBookRoom
};

export default bookingService;
