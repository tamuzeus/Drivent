import { prisma } from "@/config";
import { BookingCreation, BookingUpsert } from "protocols";

async function findWithUserId(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: {
      Room: true
    }
  });
}

async function findRoomById(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId
    }
  });
}

async function findRoom(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId
    }
  });
}

async function createBooking({ roomId, userId }: BookingCreation) {
  return prisma.booking.create({
    data: {
      roomId,
      userId
    }
  });
}

async function uptadedBooking({ roomId, id }: BookingUpsert) {
  return prisma.booking.update({
    where: {
      id
    },
    data: {
      roomId
    }
  });
}

const bookingRepository = {
  findWithUserId, findRoomById, findRoom, createBooking, uptadedBooking
};

export default bookingRepository;

