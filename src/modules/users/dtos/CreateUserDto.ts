import { User } from "@users/entities/User";

export interface CreateUserDto {
  name: string;
  email: string;
  role: User["role"];
}