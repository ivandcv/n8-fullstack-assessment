import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { DepartmentsModule } from './departments.module';

// Basic test to verify that the module can be created without errors, which
// implicitly checks that all dependencies are resolvable and correctly
// configured.
describe('DepartmentsModule', () => {
  it('should compile the module without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Department])],
      providers: [DepartmentsModule],
    })
      .overrideProvider(getRepositoryToken(Department))
      .useValue({})
      .compile();

    expect(moduleRef).toBeDefined();
  });
});
