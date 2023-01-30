import { Ticket } from "@prisma/client";
import { Payment } from "@prisma/client";

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

export type CreateTicket = Omit <Ticket, "id" | "createdAt" | "updatedAt">

export type CardPayments = {
  issuer: string,
  number: number,
  name: string,
  expirationDate: Date,
  cvv: number
}

export type PaymentObj = Omit <Payment, "id" | "createdAt" | "updatedAt">
