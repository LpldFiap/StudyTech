import { IsString } from 'class-validator';

export class DeletePostDto {
  @IsString()
  user_id: string;
}