import { IsNumber, IsString } from 'class-validator';

export class NewPlayDto {
  @IsString()
  userId: string;

  @IsString()
  gameId: string;

  @IsNumber()
  row: number;

  @IsNumber()
  col: number;
}
