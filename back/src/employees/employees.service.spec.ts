import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { DepartmentHistory } from '../department-history/entities/department-history.entity';
import { DepartmentHistoryService } from '../department-history/department-history.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let historyService: DepartmentHistoryService;

  const mockEmployees = {
    items: [
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
    ],
    total: 2,
  };
  const employeeDto = {
    firstName: 'Sack',
    lastName: 'Boy',
    hireDate: new Date('2011-01-18'),
    phone: '22222',
    address: 'Little Big Planet',
    department: '2',
    active: true,
  };
  const employee = {
    ...employeeDto,
    department: {
      id: '2',
      name: 'game development',
    },
  };

  const mockRepository = {
    find: jest.fn().mockResolvedValue(mockEmployees.items),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((employee) =>
        Promise.resolve({ id: 1, ...employee }),
      ),
    update: jest
      .fn()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation((id: number, dto: UpdateEmployeeDto) =>
        Promise.resolve({ id, employee }),
      ),
    delete: jest
      .fn()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation((id) => Promise.resolve({ affected: 1 })),
    count: jest.fn().mockResolvedValue(2),
  };

  const mockHistoryRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        DepartmentHistoryService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(DepartmentHistory),
          useValue: mockHistoryRepository,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    historyService = module.get<DepartmentHistoryService>(
      DepartmentHistoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of employees and total count', async () => {
      const employees = await service.findAll();
      expect(employees).toEqual(mockEmployees);
    });
  });

  describe('findOne', () => {
    it('should find an existing employee', async () => {
      mockRepository.findOne.mockResolvedValue(mockEmployees.items[0]);

      const result = await service.findOne(1);
      expect(result).toEqual(mockEmployees.items[0]);
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
    it('should update an employee department and return it', async () => {
      const updateEmployeeDto = { department: '1' };
      const updatedEmployee = {
        ...employeeDto,
        department: { id: 1, name: 'Administration' },
      };
      const id = 1;
      mockRepository.findOne.mockResolvedValue(employee);
      await service.update(id, updateEmployeeDto);
      expect(mockRepository.update).toHaveBeenCalledWith(id, updateEmployeeDto);
      mockRepository.findOne.mockResolvedValue(updatedEmployee);
      const result = await service.findOne(id);
      expect(result).toEqual(updatedEmployee);
    });
    it('should update an employee active status', async () => {
      const updateEmployeeDto = { active: false };
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
