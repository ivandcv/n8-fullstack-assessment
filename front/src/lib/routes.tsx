import {
  Groups,
  AccountCircle,
  SvgIconComponent,
} from '@mui/icons-material';

export interface IRouteInfo {
  id: string;
  title: string;
  Icon?: SvgIconComponent;
}

export const routeDefinitions: Record<string, IRouteInfo> = {
  employeesList: {
    id: 'employeesList',
    title: 'Employees List',
    Icon: Groups,
  },
  employeeDetails: {
    id: 'employee',
    title: 'Employee Details',
    Icon: AccountCircle,
  },
};
