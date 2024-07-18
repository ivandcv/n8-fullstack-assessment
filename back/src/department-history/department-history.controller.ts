import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentHistoryService } from './department-history.service';

@Controller('department-history')
export class DepartmentHistoryController {
  constructor(
    private readonly departmentHistoryService: DepartmentHistoryService,
  ) {}
  @Get('employees/:id')
  findByEmployee(@Param('id') id: string) {
    return this.departmentHistoryService.findByEmployee(+id);
  }
}
