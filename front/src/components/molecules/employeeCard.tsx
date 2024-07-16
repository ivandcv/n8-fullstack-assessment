import { Box, Typography, Avatar } from '@mui/material';

import { Card } from '@components/atoms';
import { IEmployee } from '../../models';
import { getHireDate, getTimeWorked } from '../../utils';

export interface IEmployeeCardProps {
  employee: IEmployee;
}

export const EmployeeCard: React.FC<IEmployeeCardProps> = ({employee: {
  firstName,
  lastName,
  hireDate,
  department,
  phone,
  address,
}}) => {
  return (
    <Card>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar />
        <Box textAlign="center" mt={2}>
          <Typography>{`${firstName} ${lastName}`}</Typography>
          <Typography>{`${getHireDate(hireDate)} (${getTimeWorked(hireDate)})`}</Typography>
          <Typography>{department}</Typography>
          <Typography>{phone}</Typography>
          <Typography>{address}</Typography>
        </Box>
      </Box>
    </Card>
  );
};
