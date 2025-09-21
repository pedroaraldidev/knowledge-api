import { User } from "@users/entities/User";
import { BaseRepository } from "@core/repositories/BaseRepository";

export interface IUserRepository extends BaseRepository<User> {}
