import { employeesClient } from '@lib/employeesClient';
import { useState } from 'react';
import { IDepartment, IEmployee } from '../../models';

type EmployeeDetailsState = {
  employee: IEmployee;
};

export type EmployeeDetailsResult = [
  EmployeeDetailsState,
  (id: string) => void,
  (newDepartment: IDepartment) => void,
  (newActive: boolean) => void,
];

export function useEmployeeDetails(): EmployeeDetailsResult {
  const [state, setState] = useState<EmployeeDetailsState>({
    employee: {
      id: 0,
      firstName: '',
      lastName: '',
      hireDate: new Date(),
      department: { id: 0, name: '' },
      phone: '',
      address: '',
      active: true,
    },
  });

  const fetchEmployee = async (id: string) => {
    const resp = await employeesClient.findById(id);

    setState({ employee: resp });
  };

  const setDepartment = async (newDepartment: IDepartment) => {
    setState({ employee: { ...state.employee, department: newDepartment } });
  };

  const setActive = async (newActive: boolean) => {
    setState({ employee: { ...state.employee, active: newActive } });
  };

  return [state, fetchEmployee, setDepartment, setActive];
}
