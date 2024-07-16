import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);

  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    this.logger.log('Creating a new employee');
    const employee = this.employeesRepository.create(createEmployeeDto);
    return this.employeesRepository.save(employee);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await Promise.all([
      this.employeesRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['department'],
      }),
      this.employeesRepository.count(),
    ]);

    return { items, total };
  }

  async findOne(id: number) {
    this.logger.log(`Retrieving employee with ID ${id}`);
    const employee = await this.employeesRepository.findOne({
      where: { id },
      relations: ['department'],
    });

    if (!employee) {
      this.logger.warn(`Employee with ID ${id} not found`);
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    this.logger.log(`Updating employee with ID ${id}`);
    await this.employeesRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  remove(id: number) {
    this.logger.log(`Deleting employee with ID ${id}`);
    return this.employeesRepository.delete(id);
  }
}
