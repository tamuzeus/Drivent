import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, conflictError, unauthorizedError } from "@/errors";

async function reciveHotelRepository(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  console.log(ticket);
  if(!ticket || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel|| ticket.status === "RESERVED") {
    throw conflictError("It's already reserved");
  }
  // if(ticket.status === 'RESERVED'){
  //     return conflictError("It's already reserved")
  // }

  const hotel = await hotelRepository.findHotel();
  return hotel;
}

async function reciveHotelIds(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if(!ticket || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel|| ticket.status === "RESERVED") {
    throw conflictError("It's already reserved");
  }
  
  const hotel = await hotelRepository.findRByHotelId(hotelId);
  return hotel;
}

const hotelService = {
  reciveHotelRepository, reciveHotelIds
};

export default hotelService;
