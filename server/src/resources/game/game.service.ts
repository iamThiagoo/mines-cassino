import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { UserPayload } from '../user/@types/user.type';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './schemas/game.schema';

@Injectable()
export class GameService {

  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateGameDto, payload: UserPayload) {
    if (dto.userId !== payload.userId) {
      throw new UnauthorizedException('Unauthorized!'); 
    }

    const user = await this.userService.findOne(dto.userId);
    if (!user) {
      throw new BadRequestException('User not found!');
    }

    if (dto.betAmount > user.balance) {
      throw new BadRequestException('Insufficient balance!');
    }

    user.balance -= dto.betAmount;
    await this.userService.update(user.id, user);

    const {board, revealed} = this.generateBoard(5, 3);

    const game = await this.gameModel.create({...dto, board, revealed});
    await game.save();
    return game;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  generateBoard(size: number, totalMines: number): { board: string[][], revealed: (boolean | null)[][] } {
    const revealed = Array.from({ length: size }, () => Array(size).fill(null));
    const board = Array.from({ length: size }, () => Array(size).fill('S'));
  
    let minesPlaced = 0;
    while (minesPlaced < totalMines) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (board[row][col] !== 'M') {
        board[row][col] = 'M';
        minesPlaced++;
      }
    }
  
    return { board, revealed };    
  }
}
