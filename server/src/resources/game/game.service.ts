import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { UserPayload } from '../user/@types/user.type';

@Injectable()
export class GameService {
  async create(dto: CreateGameDto, user: UserPayload) {
    console.log(dto, user);
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }
}
