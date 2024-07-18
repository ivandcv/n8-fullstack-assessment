import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { DepartmentHistory } from '../../department-history/entities/department-history.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'hire_date' })
  hireDate: Date;

  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'department_id' })
  department: Department | string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => DepartmentHistory, (history) => history.employee)
  departmentHistory: DepartmentHistory[];
}
