import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { BookingFactoryCreate } from "@/protocols";

export async function createBooking({ userId, roomId }: BookingFactoryCreate) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

