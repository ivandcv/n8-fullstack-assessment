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
        renderItem={(emp: IEmployee) => (
          <EmployeeCard key={emp.id} employee={emp} />
        )}
        scrollProps={{ getScrollParent: () => mainScrollElementRef.current }}
      />

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
    </Box>
  );
};
