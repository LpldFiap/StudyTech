import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/users/services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersMongooseRepository } from './repositories/mongoose/users.mongoose.repository';
import { Users, UsersSchema } from './schemas/users.schema';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UsersRepository,
      useClass: UsersMongooseRepository,
    },
    UsersService,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
