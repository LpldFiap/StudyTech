import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class PostsProvider {
  constructor(@Inject(UsersService) private userService: UsersService) {}
  public async checkUserRole(id: string): Promise<'teacher' | 'student' | ''> {
    const user = await this.userService.getUserById(id);
    return user && user.role;
  }
}
