import { Box, Button, Divider, Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useEmployeeDetails } from '@hooks/employees';
import { useEffect, useState } from 'react';
import { getHireDate, getTimeWorked } from '../../utils';
import { useLocation } from 'react-router-dom';

export const EmployeeDetailsPage: React.FC = () => {
  const location = useLocation();
  const [
    {
      employee: { firstName, lastName, hireDate, department, phone, address },
    },
    fetchEmployee,
  ] = useEmployeeDetails();
  const [currentDepartment, setCurrentDepartment] = useState(department.name);

  useEffect(() => {
    fetchEmployee(location.pathname.split('/').pop() as string);
  }, []);
  useEffect(() => {
    setCurrentDepartment(department.name);
  }, [department]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setCurrentDepartment(value);
  };

  return (
    <Box p={4}>
      <Box display="block">
        <Typography gutterBottom variant="h5" component="span">
          {`${firstName} ${lastName}`}
        </Typography>
      </Box>
      <Grid container display="flex" gap="1rem" mt={5}>
        <Grid item xs={12}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.secondary"
            >
              Phone:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {phone}
            </Typography>
          </Grid>
          <Divider/>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.secondary"
            >
              Address:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {address}
            </Typography>
          </Grid>
          <Divider/>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.secondary"
            mt="5px"
          >
            Hire Date
          </Typography>
          <Grid item display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="body2" color="text.secondary">
              {getHireDate(hireDate)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getTimeWorked(hireDate)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.secondary"
            mt="5px"
          >
            Update Department
          </Typography>
          <Select
            name="department"
            value={currentDepartment}
            onChange={handleSelectChange}
            size="small"
          >
            <MenuItem value="adminstration">Adminstration</MenuItem>
            <MenuItem value="game development">
              Game Development
            </MenuItem>
            <MenuItem value="hardware development">
              Hardware Development
            </MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="success">Update</Button>
        </Grid>
      </Grid>
    </Box>
  );
};
