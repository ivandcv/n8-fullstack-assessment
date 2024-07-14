import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Department } from '../../departments/entities/department.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  hireDate: Date;

  @ManyToOne(() => Department, (department) => department.employees)
  department: string;

  @Column()
  phone: string;

  @Column()
  address: string;
}
