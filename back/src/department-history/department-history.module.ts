import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentHistoryService } from './department-history.service';
import { DepartmentHistory } from './entities/department-history.entity';
import { DepartmentHistoryController } from './department-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentHistory])],
  controllers: [DepartmentHistoryController],
  providers: [DepartmentHistoryService],
})
export class DepartmentHistoryModule {}
