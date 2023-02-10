import { Booking } from "@prisma/client";
import { type } from "os";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

//Regra de Negócio
export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type BookingCreation = Omit <Booking, "id" | "createdAt" | "updatedAt" >

export type BookingFactoryCreate = {
  roomId: number,
  userId: number
}

export type BookingUpsert = Omit <Booking, "userId"| "createdAt" | "updatedAt" >
