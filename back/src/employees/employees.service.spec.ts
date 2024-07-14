import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

describe('EmployeesService', () => {
  let service: EmployeesService;

  const mockEmployees = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      hireDate: '2024-07-14T00:00:00.000Z',
      phone: '11111',
      address: 'P. Sherman, 42 Wallaby Way, Sydney',
      department: {
        id: 1,
        name: 'adminstration',
      },
    },
    {
      id: 2,
      firstName: 'Sack',
      lastName: 'Boy',
      hireDate: '2011-01-18T00:00:00.000Z',
      phone: '22222',
      address: 'Little Big Planet',
      department: {
        id: 2,
        name: 'game development',
      },
    },
  ];
  const employeeDto = {
    firstName: 'Sack',
    lastName: 'Boy',
    hireDate: new Date('2011-01-18'),
    phone: '22222',
    address: 'Little Big Planet',
    department: '2',
  };

  const mockRepository = {
    find: jest.fn().mockResolvedValue(mockEmployees),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((employee) =>
        Promise.resolve({ id: 1, ...employee }),
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
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      const employees = await service.findAll();
      expect(employees).toEqual(mockEmployees);
    });
  });

  describe('findOne', () => {
    it('should find an existing employee', async () => {
      mockRepository.findOne.mockResolvedValue(mockEmployees[0]);

      const result = await service.findOne(1);
      expect(result).toEqual(mockEmployees[0]);
    });

    it('should throw NotFoundException if employee does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new employee record and return it', async () => {
      expect(await service.create(employeeDto)).toEqual({
        id: 1,
        ...employeeDto,
      });
      expect(mockRepository.create).toHaveBeenCalledWith(employeeDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an employee record and return it', async () => {
      const updateEmployeeDto = { firstName: 'Jane Doe' };
      const id = 1;
      mockRepository.findOne.mockResolvedValue(employeeDto);
      await service.update(id, updateEmployeeDto);
      expect(mockRepository.update).toHaveBeenCalledWith(id, updateEmployeeDto);
      const result = await service.findOne(id);
      expect(result).toEqual({ ...updateEmployeeDto, ...employeeDto });
    });
  });

  describe('remove', () => {
    it('should remove an employee record and return the result', async () => {
      const id = 1;
      expect(await service.remove(id)).toEqual({ affected: 1 });
      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
