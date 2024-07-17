import { employeesClient } from '@lib/employeesClient';
import { useState } from 'react';
import { IEmployee } from '../../models';

type EmployeeDetailsState = {
  employee: IEmployee;
};

export type EmployeeDetailsResult = [EmployeeDetailsState, (id: string) => void];

export function useEmployeeDetails(): EmployeeDetailsResult {
  const [state, setState] = useState<EmployeeDetailsState>({
    employee: {
      id: 0,
      firstName: '',
      lastName: '',
      hireDate: new Date(),
      department: {id: 0, name: ''},
      phone: '',
      address: '',
    },
  });

  const fetchEmployee = async (id: string) => {
    const resp = await employeesClient.findById(id);

    setState({employee: resp});
  };

  return [state, fetchEmployee];
}
