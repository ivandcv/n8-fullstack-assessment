import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { HttpException, NotFoundException } from '@nestjs/common';

describe('DepartmentsController', () => {
  let controller: DepartmentsController;

  const mockDepartments = [
    {
      id: 1,
      name: 'game development',
    },
    {
      id: 2,
      name: 'hardware development',
    },
  ];
  const departmentDto = {
    name: 'game development',
  };

  const mockService = {
    findAll: jest.fn().mockResolvedValue(mockDepartments),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation((dto) => dto),
    update: jest
      .fn()
      .mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest
      .fn()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation((id) => Promise.resolve({ deleted: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [
        {
          provide: DepartmentsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DepartmentsController>(DepartmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an department', async () => {
      mockService.create.mockResolvedValue(departmentDto);
      expect(await controller.create(departmentDto)).toEqual(departmentDto);
      expect(mockService.create).toHaveBeenCalledWith(departmentDto);
    });
  });

  describe('findAll', () => {
    it('should find all departments', async () => {
      mockService.findAll.mockResolvedValue(mockDepartments);
      expect(await controller.findAll()).toEqual(mockDepartments);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find one department', async () => {
      mockService.findOne.mockResolvedValue(mockDepartments[0]);
      expect(await controller.findOne('1')).toEqual(mockDepartments[0]);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when department not found', async () => {
      const id = '999';
      mockService.findOne.mockRejectedValue(
        new NotFoundException(`Department with ID ${id} not found`),
      );
      await expect(controller.findOne(id)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update an department', async () => {
      const updateDepartmentDto = { name: 'hardware development' };
      const id = '1';
      const result = { ...updateDepartmentDto, ...departmentDto };
      mockService.update.mockResolvedValue(departmentDto);
      expect(await controller.update(id, updateDepartmentDto)).toEqual(result);
      expect(mockService.update).toHaveBeenCalledWith(1, updateDepartmentDto);
    });
  });

  describe('remove', () => {
    it('should remove an department', async () => {
      const result = { deleted: true };
      mockService.remove.mockResolvedValue(result);
      expect(await controller.remove('1')).toEqual(result);
      expect(mockService.remove).toHaveBeenCalledWith(1);
    });
  });
});
