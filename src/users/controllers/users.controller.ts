import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_id: {
          type: 'string',
          description:
            'ID do usuário que está realizando a ação de deletar o post',
        },
      },
      required: ['user_id'],
    },
  })
  async deleteUserById(
    @Param('id') id: string,
    @Body() { user_id }: { user_id: string },
  ) {
    const admin = await this.usersService.getUserById(user_id);
    if (admin && admin.role === 'teacher') {
      const deletedUser = await this.usersService.deleteUserById(id);
      return deletedUser
        ? `Usuário ${deletedUser.name} deletado com sucesso.`
        : 'Usuário não encontrado.';
    }
    return 'Você não tem permissão para deletar usuários.';
  }

  // ... outros métodos

  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.validateUser(
      body.email,
      body.password,
    );
    if (user) {
      return { message: 'Login successful.', user };
    } else {
      throw new HttpException('Invalid credentials.', HttpStatus.UNAUTHORIZED);
    }
  }
}
