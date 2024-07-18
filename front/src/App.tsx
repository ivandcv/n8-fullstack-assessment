import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { UIProvider } from '@contexts/uiContext';
import { routeDefinitions } from '@lib/routes';
import { MainLayout } from '@components/layouts';
import { EmployeeDetailsPage, EmployeeListPage } from '@components/pages';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/employees" />,
      },
      {
        path: '/employees',
        element: <Outlet />,
        children: [
          {
            path: '/employees',
            element: <EmployeeListPage />,
            id: routeDefinitions.employeesList.id,
          },
          {
            path: '/employees/:id',
            element: <EmployeeDetailsPage />,
            id: routeDefinitions.employeeDetails.id,
          },
        ],
      },
      {
        path: '/departments',
        element: <Outlet />,
        children: [
          {
            path: '/departments',
            element: (
              <h2 style={{ marginTop: '100px', marginLeft: '20px' }}>
                Departments List not implemented
              </h2>
            ),
            id: routeDefinitions.departmentsList.id,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <UIProvider>
      <RouterProvider router={appRouter} />
    </UIProvider>
  );
}

export default App;
