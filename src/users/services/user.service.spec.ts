import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../repositories/users.repository';
import { UsersService } from './users.service';
import { IUsers } from '../schemas/models/users.interface';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            createUser: jest.fn(),
            deleteUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result: IUsers[] = [];
      jest.spyOn(repository, 'getAllUsers').mockResolvedValue(result);

      expect(await service.getAllUsers(10, 1)).toBe(result);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const result: IUsers = {
        name: 'John',
        email: 'john@example.com',
        password: 'password',
        role: 'teacher',
        created_at: new Date(),
      };
      jest.spyOn(repository, 'getUserById').mockResolvedValue(result);

      expect(await service.getUserById('1')).toBe(result);
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        email: 'john@example.com',
        password: 'password',
        role: 'teacher',
      };
      const result: IUsers = { ...createUserDto, created_at: new Date() };
      jest.spyOn(repository, 'createUser').mockResolvedValue(result);

      expect(await service.createUser(createUserDto)).toBe(result);
    });
  });

  describe('updateUserById', () => {
    it('should update and return the user', async () => {
      const createUserDto: CreateUserDto & { id: string } = {
        id: '1',
        name: 'John',
        email: 'john@example.com',
        password: 'password',
        role: 'teacher',
      };
      const existingUser: IUsers = {
        name: 'Jane',
        email: 'jane@example.com',
        password: 'password',
        role: 'teacher',
        created_at: new Date(),
      };
      const updatedUser: IUsers = {
        ...createUserDto,
        created_at: existingUser.created_at,
      };

      jest.spyOn(repository, 'getUserById').mockResolvedValue(existingUser);
      jest.spyOn(repository, 'createUser').mockResolvedValue(updatedUser);

      expect(await service.updateUserById(createUserDto)).toBe(updatedUser);
    });
  });

  describe('deleteUserById', () => {
    it('should delete and return the user', async () => {
      const result: IUsers = {
        name: 'John',
        email: 'john@example.com',
        password: 'password',
        role: 'teacher',
        created_at: new Date(),
      };
      jest.spyOn(repository, 'deleteUserById').mockResolvedValue(result);

      expect(await service.deleteUserById('1')).toBe(result);
    });
  });
});
