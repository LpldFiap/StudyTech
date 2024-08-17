import { InjectModel } from '@nestjs/mongoose';
import { UsersRepository } from '../users.repository';
import { Model } from 'mongoose';
import { Users } from '@src/users/schemas/users.schema';
import { IUsers } from '@src/users/schemas/models/users.interface';

export class UsersMongooseRepository extends UsersRepository {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {
    super();
  }

  async getAllUsers(limit: number, page: number): Promise<IUsers[]> {
    const offset = (page - 1) * limit;
    return this.usersModel.find().skip(offset).limit(limit).exec();
  }

  async createUser(createUserDto: IUsers): Promise<IUsers> {
    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save();
  }

  async getUserById(id: string): Promise<IUsers> {
    const user = this.usersModel.findById(id);
    return user;
  }

  async deleteUserById(id: string): Promise<IUsers> {
    const user = this.usersModel.findByIdAndDelete(id).exec();
    return user;
  }

  async updateUserById(
    createUserDto: IUsers & { id: string },
  ): Promise<IUsers> {
    const { id, ...user } = createUserDto;
    const updatedUser = this.usersModel.findByIdAndUpdate(id, user).exec();
    return updatedUser;
  }
}
