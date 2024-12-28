import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: any;

  beforeEach(async () => {
    mockUserService = {
      create: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create a user', () => {
    it('should call UserService.create with the correct DTO', async () => {
      const dto = { name: 'Thiago' };
      const mockResponse = {
        access_token: 'mockToken',
        userId: '1',
        username: 'Thiago',
        balance: 10000,
      };
      mockUserService.create.mockResolvedValue(mockResponse);
      const result = await controller.create(dto);
      expect(result).toEqual(mockResponse);
      expect(mockUserService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('find a user', () => {
    it('should call UserService.findOne and return the result', async () => {
      const mockUser = { id: '1', name: 'Thiago', balance: 10000 };
      mockUserService.findOne.mockResolvedValue(mockUser);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockUser);
      expect(mockUserService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('remove a user', () => {
    it('should call UserService.remove and return the result', async () => {
      const mockDeleteResult = { acknowledged: true, deletedCount: 1 };
      mockUserService.remove.mockResolvedValue(mockDeleteResult);
      const result = await controller.remove('1');
      expect(result).toEqual(mockDeleteResult);
      expect(mockUserService.remove).toHaveBeenCalledWith('1');
    });
  });
});
