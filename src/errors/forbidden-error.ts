import { ApplicationError } from "@/protocols";

export function ForbiddenError(): ApplicationError {
  return {
    name: "ForbiddenError",
    message: "Forbidden!",
  };
}

