import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger(DepartmentsService.name);

  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    this.logger.log('Creating a new department');
    const department = this.departmentsRepository.create(createDepartmentDto);
    return this.departmentsRepository.save(department);
  }

  findAll() {
    this.logger.log('Retrieving all departments');
    return this.departmentsRepository.find();
  }

  async findOne(id: number) {
    this.logger.log(`Retrieving department with ID ${id}`);
    const department = await this.departmentsRepository.findOne({
      where: { id },
      relations: ['employees'],
    });

    if (!department) {
      this.logger.warn(`Department with ID ${id} not found`);
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    this.logger.log(`Updating department with ID ${id}`);
    await this.departmentsRepository.update(id, updateDepartmentDto);
    return this.findOne(id);
  }

  remove(id: number) {
    this.logger.log(`Deleting department with ID ${id}`);
    return this.departmentsRepository.delete(id);
  }
}
