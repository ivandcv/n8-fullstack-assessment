import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department, {
    nullable: true,
  })
  employees: Employee[];
}
