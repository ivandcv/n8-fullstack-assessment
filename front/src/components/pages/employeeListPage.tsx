import { useState } from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { Create } from '@mui/icons-material';

import {
  CreateEmployeeModal,
  DeleteEmployeeModal,
  EmployeeCard,
  Alert,
} from '@components/molecules';
import { InfiniteScrollList } from '@components/organisms';
import { useEmployeeList } from '@hooks/employees/useEmployeesList';
import { useUIContext } from '@hooks/useUIContext';
import { IEmployee } from '../../models';
import { employeesClient } from '@lib/employeesClient';

const ListContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 2,
    }}
  >
    {children}
  </Box>
);

export const EmployeeListPage: React.FC = () => {
  const [{ employees, hasMore, fetching }, goNextPage, deleteEmployee] =
    useEmployeeList();
  const [currentEmployeeId, setCurrentEmployeeId] = useState(-1);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    show: false,
    message: '',
    error: false,
  });

  const { navbarInteractivePortal, mainScrollElementRef } = useUIContext();

  const handleDelete = async () => {
    await employeesClient.delete(currentEmployeeId.toString());
    deleteEmployee(currentEmployeeId);
    setCustomAlert({
      show: true,
      message: `Deleted employee ID ${currentEmployeeId}`,
      error: true,
    });
    setOpenDelete(false);
  };

  const handleCreate = () => {
    setCustomAlert({
      show: true,
      message: 'Created employee successfully',
      error: false,
    });
    setOpenCreate(false);
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Button
          size="large"
          variant="contained"
          endIcon={<Create />}
          sx={{ lineHeight: 'unset' }}
          onClick={() => setOpenCreate(true)}
        >
          Add Employee
        </Button>
      </Box>
      {employees.items.length === 0 ? (
        <Typography variant="h4" display="flex" justifyContent="center">No Employees Found</Typography>
      ) : (
        <InfiniteScrollList<IEmployee>
          items={employees.items}
          hasMore={hasMore}
          loadMore={goNextPage}
          loading={fetching}
          ListContainer={ListContainer}
          renderItem={(emp: IEmployee) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              setOpenDeleteModal={setOpenDelete}
              setCurrentEmployee={setCurrentEmployeeId}
            />
          )}
          scrollProps={{ getScrollParent: () => mainScrollElementRef.current }}
        />
      )}

      {navbarInteractivePortal(
        <Box
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="end"
          pl={8}
          flexGrow={1}
        >
          {fetching && <LinearProgress sx={{ width: '100%' }} />}
          {!fetching && (
            <>
              <Typography
                variant="caption"
                style={{ color: 'rgb(182, 190, 201)' }}
                display={{ xs: 'none', md: 'block' }}
              >
                Displaying {employees.items.length} out of {employees.total}
              </Typography>
              <Typography
                variant="caption"
                style={{ color: 'rgb(182, 190, 201)' }}
                display={{ xs: 'block', md: 'none' }}
              >
                {employees.items.length}/{employees.total}
              </Typography>
            </>
          )}
        </Box>,
      )}
      <CreateEmployeeModal
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        handleAlert={handleCreate}
      />
      <DeleteEmployeeModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      />
      <Alert
        show={customAlert.show}
        message={customAlert.message}
        error={customAlert.error}
        setShow={(e: boolean) => setCustomAlert({ ...customAlert, show: e })}
      />
    </Box>
  );
};
