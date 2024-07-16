import { Typography, CardContent, CardActions, Button } from '@mui/material';

import { Card } from '@components/atoms';
import { IEmployee } from '../../models';
import { getHireDate, getTimeWorked } from '../../utils';

export interface IEmployeeCardProps {
  employee: IEmployee;
}

export const EmployeeCard: React.FC<IEmployeeCardProps> = ({
  employee: { firstName, lastName, hireDate, department, phone, address },
}) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography variant="h5" component="div">
          {`${getHireDate(hireDate)} (${getTimeWorked(hireDate)})`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {department}
        </Typography>
        <Typography variant="body2">
          {phone}
          <br />
          {address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
