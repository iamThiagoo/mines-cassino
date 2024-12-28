import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponse, UserResponse } from './@types/user';
import { DeleteResult } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) : Promise<CreateUserResponse> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<UserResponse> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}