import { IUsers } from '../schemas/models/users.interface';

export abstract class UsersRepository {
  abstract getAllUsers(limit: number, page: number): Promise<IUsers[]>;
  abstract createUser(createUserDto: IUsers): Promise<IUsers>;
  abstract getUserById(id: string): Promise<IUsers>;
  abstract updateUserById(
    updateUserDto: IUsers & { id: string },
  ): Promise<IUsers>;
  abstract deleteUserById(id: string): Promise<IUsers>;
}
