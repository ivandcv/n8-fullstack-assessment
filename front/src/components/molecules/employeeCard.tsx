import {
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';

import { Card } from '@components/atoms';
import { IEmployee } from '../../models';
import { getHireDate, getTimeWorked } from '../../utils';

export interface IEmployeeCardProps {
  employee: IEmployee;
}

export const EmployeeCard: React.FC<IEmployeeCardProps> = ({
  employee: { firstName, lastName, hireDate, department },
}) => {
  return (
    <Card>
      <CardContent>
        <Box display="block">
          <Typography gutterBottom variant="h5" component="span">
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            component="span"
            ml="10px"
          >{`(${department.name})`}</Typography>
        </Box>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.secondary"
          mt="25px"
        >
          Hire Date
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${getHireDate(hireDate)} (${getTimeWorked(hireDate)})`}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" color="error">
          Delete
        </Button>
        <Button size="small">View Details</Button>
      </CardActions>
    </Card>
  );
};
