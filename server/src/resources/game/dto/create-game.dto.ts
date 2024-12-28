import { IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  userId: string;

  @IsNumber()
  betAmount: number;
}
