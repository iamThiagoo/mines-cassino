import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import { DeleteResult } from 'mongoose';
import { User } from '../schemas/user.schema';

describe('UserService', () => {
  let service: UserService;
  let userModelMock: any;
  let jwtServiceMock: any;

  beforeEach(async () => {
    userModelMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    jwtServiceMock = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: userModelMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a user', () => {
    it('should create a user and return: access token, userId, username, and balance', async () => {
      const dto: CreateUserDto = { name: 'Thiago' };
      const mockUser = { id: '1', name: 'Thiago', balance: 10000 };
      const mockToken = 'mockAccessToken';

      userModelMock.create.mockResolvedValue(mockUser);
      jwtServiceMock.signAsync.mockResolvedValue(mockToken);

      const result = await service.create(dto);

      expect(result).toEqual({
        access_token: mockToken,
        userId: '1',
        username: 'Thiago',
        balance: 10000,
      });

      expect(userModelMock.create).toHaveBeenCalledWith(dto);
      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
        user: mockUser.name,
      });
    });
  });

  describe('find a user', () => {
    it('should find and return a user by id', async () => {
      const mockUser = { id: '1', name: 'Thiago', balance: 10000 };

      userModelMock.findById.mockResolvedValue(mockUser);

      const result = await service.findOne('1');

      expect(result).toEqual(mockUser);
      expect(userModelMock.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('remove a user', () => {
    it('should remove a user by id and return DeleteResult', async () => {
      const mockDeleteResult: DeleteResult = {
        acknowledged: true,
        deletedCount: 1,
      };

      userModelMock.findByIdAndDelete.mockResolvedValue(mockDeleteResult);

      const result = await service.remove('1');

      expect(result).toEqual(mockDeleteResult);
      expect(userModelMock.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});
