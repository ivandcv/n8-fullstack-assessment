import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Employee } from './src/employees/entities/employee.entity';
import { Department } from './src/departments/entities/department.entity';
import { DepartmentHistory } from './src/department-history/entities/department-history.entity';

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST', 'localhost'),
  port: configService.get<number>('DATABASE_PORT') || 5432,
  username: configService.get<string>('DATABASE_USER', 'postgres'),
  password: configService.get<string>('DATABASE_PASSWORD', 'postgres'),
  database: configService.get<string>(
    'DATABASE_NAME',
    'n8_fullstack_assessment',
  ),
  entities: [Employee, Department, DepartmentHistory],
  migrations: [__dirname + '/src/migration/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});
