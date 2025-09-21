import { IUserRepository } from "@users/repositories/IUserRepository";
import { User } from "@users/entities/User";

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async create(item: User): Promise<User> {
    this.users.push(item);
    return item;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  async findAll(): Promise<User[]> {
    return this.users || [];
  }

  async update(id: string, item: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    this.users[index] = {
      ...this.users[index],
      ...item,
      updatedAt: new Date(),
    };
    return this.users[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    this.users[index].deletedAt = new Date();
    return true;
  }
}
