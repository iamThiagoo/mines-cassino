import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Socket } from 'socket.io';

@UseGuards(AuthGuard)
@WebSocketGateway({ namespace: 'game' })
export class GameGateway {
  constructor(private readonly gameService: GameService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('createGame')
  async create(
    @ConnectedSocket() client: Socket,
    @MessageBody(new ValidationPipe()) createGameDto: CreateGameDto,
    @Request() req: any,
  ) {
    const game = await this.gameService.create(createGameDto, req.user);
    client.emit('gameCreated', {
      gameId: game.id,
      message: "Game created successfully",
    });
  }

  @SubscribeMessage('findOneGame')
  findOne(@MessageBody() id: number) {
    return this.gameService.findOne(id);
  }

  @SubscribeMessage('updateGame')
  update(@MessageBody() updateGameDto: UpdateGameDto) {
    return this.gameService.update(updateGameDto.id, updateGameDto);
  }
}
