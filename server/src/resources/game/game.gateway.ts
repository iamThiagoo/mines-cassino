import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Socket } from 'socket.io';
import { NewPlayDto } from './dto/new-play.dto';
import { FinishDto } from './dto/finish.dto';

@UseGuards(AuthGuard)
@WebSocketGateway()
export class GameGateway {
  constructor(private readonly gameService: GameService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('game:create')
  async create(
    @ConnectedSocket() client: Socket,
    @MessageBody(new ValidationPipe()) createGameDto: CreateGameDto,
    @Request() req: any,
  ) {
    const game = await this.gameService.create(createGameDto, req.user);
    client.emit('game:created', {
      gameId: game.id,
      message: 'Game created successfully',
    });
  }

  @SubscribeMessage('game:play')
  async play(
    @ConnectedSocket() client: Socket,
    @MessageBody(new ValidationPipe()) play: NewPlayDto,
    @Request() req: any,
  ) {
    const game = await this.gameService.play(play, req.user);

    if (game.isGameOver) {
      client.emit('game:finished', {
        gameId: game.id,
        board: game.board,
        revealed: game.revealed,
        message: 'Game finished',
      });
    } else {
      client.emit('game:played', {
        gameId: game.id,
        odd: game.lastOdd,
        hits: game.hits,
        row: play.row,
        col: play.col,
        message: 'Game played successfully',
      });
    }
  }

  @SubscribeMessage('game:finish')
  async finish(
    @ConnectedSocket() client: Socket,
    @MessageBody(new ValidationPipe()) finish: FinishDto,
    @Request() req: any,
  ) {
    const { game, user } = await this.gameService.finish(finish, req.user);
    client.emit('game:finished', {
      gameId: game.id,
      balance: user.balance,
      winAmount: game.winAmount,
      board: game.board,
      revealed: game.revealed,
      message: 'Game finished successfully',
    });
  }
}
