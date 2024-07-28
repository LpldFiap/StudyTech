import { Injectable } from '@nestjs/common';
import { IUsers } from '../schemas/models/users.interface';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers(limit: number, page: number): Promise<IUsers[]> {
    return this.usersRepository.getAllUsers(limit, page);
  }
  async getUserById(id: string): Promise<IUsers> {
    return this.usersRepository.getUserById(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUsers> {
    const newUser: IUsers = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role,
      created_at: new Date(),
    };
    return this.usersRepository.createUser(newUser);
  }

  async updateUserById(createUserDto: CreateUserDto & { id: string }) {
    const user = await this.usersRepository.getUserById(createUserDto.id);
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    return this.usersRepository.createUser(user);
  }

  async deleteUserById(id: string): Promise<IUsers> {
    return this.usersRepository.deleteUserById(id);
  }
}
