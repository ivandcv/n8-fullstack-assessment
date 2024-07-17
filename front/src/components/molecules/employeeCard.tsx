import {
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
  Divider,
} from '@mui/material';

import { Card } from '@components/atoms';
import { IEmployee } from '../../models';
import { getHireDate, getTimeWorked } from '../../utils';
import { useNavigate } from 'react-router-dom';

export interface IEmployeeCardProps {
  employee: IEmployee;
  setOpenDeleteModal: (open: boolean) => void;
  setCurrentEmployee: (employeeId: number) => void;
}

export const EmployeeCard: React.FC<IEmployeeCardProps> = ({
  employee: { id, firstName, lastName, hireDate, department },
  setOpenDeleteModal,
  setCurrentEmployee,
}) => {
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    setCurrentEmployee(id);
    setOpenDeleteModal(true);
  }
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
        <Divider />
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.secondary"
          mt="5px"
        >
          Hire Date
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${getHireDate(hireDate)} (${getTimeWorked(hireDate)})`}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" color="error" onClick={() => handleDelete(id)}>
          Delete
        </Button>
        <Button size="small" onClick={() => navigate(`employees/${id}`)}>View Details</Button>
      </CardActions>
    </Card>
  );
};
