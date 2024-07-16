import { Box, LinearProgress, Typography } from '@mui/material';

import { EmployeeCard } from '@components/molecules';
import { InfiniteScrollList } from '@components/organisms';
import { useEmployeeList } from '@hooks/employees/useEmployeesList';
import { useUIContext } from '@hooks/useUIContext';
import { IEmployee } from '../../models';

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
  const [{ employees, hasMore, fetching }, goNextPage] = useEmployeeList();

  const { navbarInteractivePortal, mainScrollElementRef } = useUIContext();

  return (
    <Box p={4} overflow="auto">
      <InfiniteScrollList<IEmployee>
        items={employees.items}
        hasMore={hasMore}
        loadMore={goNextPage}
        loading={fetching}
        ListContainer={ListContainer}
        renderItem={(emp: IEmployee) => <EmployeeCard key={emp.id} employee={emp} />}
        scrollProps={{ getScrollParent: () => mainScrollElementRef.current }}
      />

      {navbarInteractivePortal(
        <Box
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="end"
          pl={8}
        >
          {fetching && <LinearProgress sx={{ width: '100%' }} />}
          {!fetching && (
            <Typography variant="caption">
              Displaying {employees.items.length} out of {employees.total}{' '}
              total employees
            </Typography>
          )}
        </Box>,
      )}
    </Box>
  );
};
