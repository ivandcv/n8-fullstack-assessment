import { IDepartment } from "./department";

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  hireDate: Date;
  department: IDepartment;
  phone: string;
  address: string;
  active: boolean;
}

export interface ICreateEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  hireDate?: Date;
  department?: string;
  phone?: string;
  address?: string;
  active?: boolean;
}