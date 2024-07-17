import { departmentsClient } from '@lib/departmentsClient';
import { useEffect, useState } from 'react';
import { IDepartment } from '../../models';

type DepartmentListState = {
  departments: IDepartment[];
};

export type DepartmentListResult = [DepartmentListState, () => void];

export function useDepartmentList(): DepartmentListResult {
  const [state, setState] = useState<DepartmentListState>({
    departments: [],
  });

  const fetchAll = async () => {
    const resp = await departmentsClient.list();

    setState({ departments: resp });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return [state, fetchAll];
}
