import { IUserRepository } from "@users/repositories/IUserRepository";
import { User } from "@users/entities/User";
import { v4 as uuidv4 } from "uuid";
import { CreateUserDto } from "@modules/users/dtos/CreateUserDto";

export class UserService {
  constructor(private userRepository: IUserRepository) {} 
  
  async createUser(data: CreateUserDto): Promise<User> {
    const { name, email, role } = data;
    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.userRepository.create(newUser);
  }

  async updateUser(id: string, data: Partial<CreateUserDto>): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = await this.userRepository.update(id, data);
    return updatedUser;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
  
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await this.userRepository.delete(id);
  }
}