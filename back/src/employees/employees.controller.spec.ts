import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { HttpException, NotFoundException } from '@nestjs/common';

describe('EmployeesController', () => {
  let controller: EmployeesController;

  const mockEmployees = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      hireDate: '2024-07-14T00:00:00.000Z',
      phone: '11111',
      address: 'P. Sherman, 42 Wallaby Way, Sydney',
      department: 1,
    },
    {
      id: 2,
      firstName: 'Sack',
      lastName: 'Boy',
      hireDate: '2011-01-18T00:00:00.000Z',
      phone: '22222',
      address: 'Little Big Planet',
      department: 2,
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

  const mockService = {
    findAll: jest.fn().mockResolvedValue(mockEmployees),
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
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an employee', async () => {
      mockService.create.mockResolvedValue(employeeDto);
      expect(await controller.create(employeeDto)).toEqual(employeeDto);
      expect(mockService.create).toHaveBeenCalledWith(employeeDto);
    });
  });

  describe('findAll', () => {
    it('should find all employees', async () => {
      mockService.findAll.mockResolvedValue(mockEmployees);
      expect(await controller.findAll()).toEqual(mockEmployees);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find one employee', async () => {
      mockService.findOne.mockResolvedValue(mockEmployees[0]);
      expect(await controller.findOne('1')).toEqual(mockEmployees[0]);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when employee not found', async () => {
      const id = '999';
      mockService.findOne.mockRejectedValue(
        new NotFoundException(`Employee with ID ${id} not found`),
      );
      await expect(controller.findOne(id)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update an employee', async () => {
      const updateEmployeeDto = { firstName: 'Jane Doe' };
      const id = '1';
      const result = { ...updateEmployeeDto, ...employeeDto };
      mockService.update.mockResolvedValue(employeeDto);
      expect(await controller.update(id, updateEmployeeDto)).toEqual(result);
      expect(mockService.update).toHaveBeenCalledWith(1, updateEmployeeDto);
    });
  });

  describe('remove', () => {
    it('should remove an employee', async () => {
      const result = { deleted: true };
      mockService.remove.mockResolvedValue(result);
      expect(await controller.remove('1')).toEqual(result);
      expect(mockService.remove).toHaveBeenCalledWith(1);
    });
  });
});
