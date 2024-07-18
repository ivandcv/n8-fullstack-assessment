import { IDepartment } from "./department";
import { IEmployee } from "./employee";

export interface IDepartmentHistory {
  id: number;
  changedAt: Date;
  employee: IEmployee;
  department: IDepartment;
}