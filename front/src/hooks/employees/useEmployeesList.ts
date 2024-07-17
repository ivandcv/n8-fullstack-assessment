import { employeesClient } from '@lib/employeesClient';
import { useEffect, useState } from 'react';
import { IEmployee, ListResponse } from '../../models';

type EmployeeListState = {
  fetching: boolean;
  hasMore: boolean;
  employees: ListResponse<IEmployee>;
  currentPage: number;
};

export type EmployeeListResult = [
  EmployeeListState,
  () => void,
  (id: number) => void,
];

export function useEmployeeList(pageSize = 20): EmployeeListResult {
  const [state, setState] = useState<EmployeeListState>({
    fetching: false,
    hasMore: true,
    currentPage: 0,
    employees: { items: [], total: -1 },
  });

  const fetchNextPage = async () => {
    if (!state.fetching && state.hasMore) {
      const nextPage = state.currentPage + 1;

      setState((s) => ({ ...s, fetching: true }));

      const resp = await employeesClient.list(nextPage, pageSize);
      const newEmployees = [...state.employees.items, ...resp.items];

      setState({
        fetching: false,
        hasMore: resp.total > newEmployees.length,
        employees: { items: newEmployees, total: resp.total },
        currentPage: nextPage,
      });
    }
  };

  const deleteEmployee = (id: number) => {
    const newEmployees = state.employees.items.filter((e) => e.id !== id);
    setState({
      ...state,
      employees: {
        total: state.employees.total - 1,
        items: newEmployees,
      },
    });
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  return [state, fetchNextPage, deleteEmployee];
}
