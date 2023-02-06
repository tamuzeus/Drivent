import { prisma } from "@/config";

async function findHotel() {
  return prisma.hotel.findMany();
}

const hotelRepository = {
  findHotel
};
  
export default hotelRepository;
  
