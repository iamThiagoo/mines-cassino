import { IsString } from 'class-validator';

export class FinishDto {
  @IsString()
  userId: string;

  @IsString()
  gameId: string;
}
