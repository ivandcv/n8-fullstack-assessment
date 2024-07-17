export interface IRouteInfo {
  id: string;
  title: string;
}

export const routeDefinitions: Record<string, IRouteInfo> = {
  employeesList: {
    id: 'employeesList',
    title: 'Employees List',
  },
  employeeDetails: {
    id: 'employee',
    title: 'Employee Details',
  },
};
