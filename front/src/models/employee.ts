import { IDepartment } from "./department";

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  hireDate: Date;
  department: IDepartment;
  phone: string;
  address: string;
}
