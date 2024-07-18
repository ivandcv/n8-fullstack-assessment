import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentHistory } from '../department-history/entities/department-history.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Department } from '../departments/entities/department.entity';

@Injectable()
export class DepartmentHistoryService {
  private readonly logger = new Logger(DepartmentHistoryService.name);

  constructor(
    @InjectRepository(DepartmentHistory)
    private departmentHistoryRepository: Repository<DepartmentHistory>,
  ) {}

  async logChange(
    employee: Employee,
    department: Department,
  ): Promise<DepartmentHistory> {
    this.logger.log(`Logging department change for employee ${employee.id}`);
    const history = this.departmentHistoryRepository.create({
      employee,
      department,
      changedAt: new Date(),
    });

    return this.departmentHistoryRepository.save(history);
  }

  async findByEmployee(id: number): Promise<DepartmentHistory[]> {
    this.logger.log(
      `Retrieving all department history records for employee ${id}`,
    );
    const departmentHistory = await this.departmentHistoryRepository.find({
      where: { employee: { id } },
      relations: ['employee', 'department'],
    });

    return departmentHistory;
  }
}
