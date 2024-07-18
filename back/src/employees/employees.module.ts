import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './entities/employee.entity';
import { DepartmentHistory } from '../department-history/entities/department-history.entity';
import { DepartmentHistoryService } from '../department-history/department-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, DepartmentHistory])],
  controllers: [EmployeesController],
  providers: [EmployeesService, DepartmentHistoryService],
})
export class EmployeesModule {}
