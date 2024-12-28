import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserResponse, UserResponse } from './@types/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto): Promise<CreateUserResponse> {
    const user = await this.userModel.create(dto);
    const access_token = await this.jwtService.signAsync({
      userId: user.id,
      username: user.name,
    });
    return {
      access_token,
      userId: user.id,
      username: user.name,
      balance: user.balance,
    };
  }

  async findOne(id: string): Promise<UserResponse> {
    return await this.userModel.findById(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
