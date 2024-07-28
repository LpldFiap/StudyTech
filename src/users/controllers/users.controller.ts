import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.usersService.getAllUsers(limit, page);
  }
  @Get('/:id')
  async getOneUser(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    return user || 'User não encontrado.';
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.createUser(createUserDto);
    return {
      Name: createdUser.name,
      Email: createdUser.email,
      Role: createdUser.role,
    };
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return this.usersService.updateUserById({ ...updateUserDto, id });
  }

  @Delete('/:id')
  async deleteUserById(
    @Param('id') id: string,
    @Body() { adminId }: { adminId: string },
  ) {
    const admin = await this.usersService.getUserById(adminId);
    if (admin && admin.role === 'teacher') {
      const deletedUser = await this.usersService.deleteUserById(id);
      return deletedUser
        ? `Usuário ${deletedUser.name} deletado com sucesso.`
        : 'Usuário não encontrado.';
    }
    return 'Você não tem permissão para deletar usuários.';
  }
}
