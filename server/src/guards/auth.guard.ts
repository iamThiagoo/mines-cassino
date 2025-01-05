import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Socket } from 'socket.io';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request =
      context.getType() === 'ws'
        ? context.switchToWs().getClient<Socket>()
        : context.switchToHttp().getRequest<Request>();

    try {
      const token = this.extractTokenFromRequest(request);
      if (!token) throw new UnauthorizedException();
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromRequest(
    request: Request | Socket | any,
  ): string | undefined {
    const authorization =
      'handshake' in request
        ? request.handshake.auth?.token
        : request.headers?.authorization;
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
