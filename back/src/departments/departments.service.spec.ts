import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';

describe('DepartmentsService', () => {
  let service: DepartmentsService;

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

  const mockRepository = {
    find: jest.fn().mockResolvedValue(mockDepartments),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((department) =>
        Promise.resolve({ id: 1, ...department }),
      ),
    update: jest
      .fn()
      .mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
    delete: jest
      .fn()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation((id) => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        {
          provide: getRepositoryToken(Department),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of departments', async () => {
      const departments = await service.findAll();
      expect(departments).toEqual(mockDepartments);
    });
  });

  describe('findOne', () => {
    it('should find an existing department', async () => {
      const expectedDepartment = { id: 1, name: 'game development' };
      mockRepository.findOne.mockResolvedValue(expectedDepartment);

      const result = await service.findOne(1);
      expect(result).toEqual(expectedDepartment);
    });

    it('should throw NotFoundException if department does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new department record and return it', async () => {
      const createDepartmentDto = {
        name: 'game development',
      };
      expect(await service.create(createDepartmentDto)).toEqual({
        id: 1,
        ...createDepartmentDto,
      });
      expect(mockRepository.create).toHaveBeenCalledWith(createDepartmentDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an department record and return it', async () => {
      const updateDepartmentDto = { name: 'hardware development' };
      const id = 1;
      const existingDepartment = { id: 1, name: 'game development' };
      mockRepository.findOne.mockResolvedValue(existingDepartment);
      await service.update(id, updateDepartmentDto);
      expect(mockRepository.update).toHaveBeenCalledWith(
        id,
        updateDepartmentDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove an department record and return the result', async () => {
      const id = 1;
      expect(await service.remove(id)).toEqual({ affected: 1 });
      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
