import { prisma } from "@/config";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { BookingCreation } from "protocols";

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

const bookingRepository = {
  findWithUserId, findRoomById, findRoom, createBooking
};

export default bookingRepository;
