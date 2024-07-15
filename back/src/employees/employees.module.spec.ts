import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Department } from '../departments/entities/department.entity';
import { EmployeesModule } from './employees.module';

// Basic test to verify that the module can be created without errors, which
// implicitly checks that all dependencies are resolvable and correctly
// configured.
describe('EmployeesModule', () => {
  it('should compile the module without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Employee, Department])],
      providers: [EmployeesModule],
    })
      .overrideProvider(getRepositoryToken(Employee))
      .useValue({})
      .overrideProvider(getRepositoryToken(Department))
      .useValue({})
      .compile();

    expect(moduleRef).toBeDefined();
  });
});
