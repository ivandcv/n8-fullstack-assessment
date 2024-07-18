import { departmentHistoryClient } from '@lib/departmentHistoryClient';
import { useState } from 'react';
import { IDepartmentHistory } from '../../models';

type DepartmentHistoryListState = {
  history: IDepartmentHistory[];
};

export type DepartmentHistoryListResult = [DepartmentHistoryListState, (id: number) => void];

export function useDepartmentHistoryList(): DepartmentHistoryListResult {
  const [state, setState] = useState<DepartmentHistoryListState>({
    history: [],
  });

  const fetchByEmployee = async (employeeId: number) => {
    const resp = await departmentHistoryClient.findByEmployee(employeeId);

    setState({ history: resp });
  };

  return [state, fetchByEmployee];
}
