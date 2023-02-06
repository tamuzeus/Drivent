import { prisma } from "@/config";

async function findHotel() {
  return prisma.hotel.findMany();
}

async function findRByHotelId(hotelId: number) {
  return prisma.hotel.findMany({
    where: {
      id: hotelId
    }, 
    include: {
      Rooms: true
    }
  });
}

const hotelRepository = {
  findHotel, findRByHotelId
};
  
export default hotelRepository;
  
