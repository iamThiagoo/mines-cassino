import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UserPayload } from '../user/@types/user.type';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './schemas/game.schema';
import { GameStatus } from './enum/game.enum';
import { OddEnum } from './enum/odd.enum';
import { NewPlayDto } from './dto/new-play.dto';

@Injectable()
export class GameService {

  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateGameDto, payload: UserPayload) {
    if (dto.userId !== payload.userId)
      throw new UnauthorizedException('Unathorized.');
  
    const session = await this.gameModel.db.startSession();
    session.startTransaction();
  
    try {
      const user = await this.userService.findOne(dto.userId);
      if (!user) throw new BadRequestException('User not found.');
  
      if (dto.betAmount > user.balance) {
        throw new BadRequestException('Insufficient balance.');
      }
  
      user.balance -= dto.betAmount;
      await this.userService.update(user.id, user);

      const { board, revealed } = this.generateBoard(5, 3);
      const game = await this.gameModel.create([{ ...dto, board, revealed }], { session });
      await session.commitTransaction();
      return game[0];

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async play(dto: NewPlayDto, payload: UserPayload) {    
    const game = await this.gameModel.findById(dto.gameId);
    if (!game) throw new BadRequestException('Game not found!');
    if (game.isGameOver) throw new BadRequestException('Game is over!');

    if (dto.userId !== game.userId || payload.userId !== game.userId)
      throw new UnauthorizedException('Unauthorized!');

    if (game.revealed[dto.row][dto.col] !== null)
      throw new BadRequestException('Cell already revealed or invalid position.');

    if (game.board[dto.row][dto.col] === GameStatus.MINE) {
      game.isGameOver = true;
      game.finishedAt = new Date();
    } else {
      ++game.hits;
      const odd = `HIT_${game.hits}` as keyof typeof OddEnum;
      game.lastOdd = OddEnum[odd];
    }

    game.revealed[dto.row][dto.col] = 'X';

    await this.gameModel.findByIdAndUpdate(game.id, game);
    return game;
  }

  generateBoard(size: number, totalMines: number): { board: string[][], revealed: (boolean | null)[][] } {
    const revealed = Array.from({ length: size }, () => Array(size).fill(null));
    const board = Array.from({ length: size }, () => Array(size).fill(GameStatus.SAVE));
  
    let minesPlaced = 0;
    while (minesPlaced < totalMines) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (board[row][col] !== GameStatus.MINE) {
        board[row][col] = GameStatus.MINE;
        minesPlaced++;
      }
    }
  
    return { board, revealed };    
  }
}
