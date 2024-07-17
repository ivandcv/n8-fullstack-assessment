import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useEmployeeDetails } from '@hooks/employees';
import { useDepartmentList } from '@hooks/departments';
import { useLocation } from 'react-router-dom';
import { getHireDate, getTimeWorked } from '../../utils';
import { employeesClient } from '@lib/employeesClient';
import { IDepartment } from 'src/models';
import { Alert } from '@components/molecules';

export const EmployeeDetailsPage: React.FC = () => {
  const location = useLocation();
  const [
    {
      employee: {
        id: employeeId,
        firstName,
        lastName,
        hireDate,
        department,
        phone,
        address,
        active,
      },
    },
    fetchEmployee,
    setDepartment,
    setActive,
  ] = useEmployeeDetails();
  const [{ departments }, fetchDepartments] = useDepartmentList();
  const [currentDepartment, setCurrentDepartment] = useState(
    department.id.toString(),
  );
  const [customAlert, setCustomAlert] = useState({
    show: false,
    message: '',
    error: false,
  });

  useEffect(() => {
    fetchEmployee(location.pathname.split('/').pop() as string);
    fetchDepartments();
  }, []);
  useEffect(() => {
    setCurrentDepartment(department.id.toString());
  }, [department]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setCurrentDepartment(value);
  };

  const handleUpdate = async () => {
    await employeesClient.update({
      id: employeeId,
      department: currentDepartment,
    });
    const newDepartment: IDepartment = departments.find(
      (d) => d.id === parseInt(currentDepartment),
    ) || { id: 0, name: '' };
    setDepartment(newDepartment);
    setCustomAlert({
      show: true,
      message: `Department updated successfully`,
      error: false,
    });
  };

  const handleActiveChange = async () => {
    await employeesClient.update({
      id: employeeId,
      active: !active,
    });
    setCustomAlert({
      show: true,
      message: `Employee ${active ? 'Deactivated' : 'Activated'}`,
      error: active,
    });
    setActive(!active);
  };

  return (
    <Box p={4}>
      <Box display="block">
        <Typography gutterBottom variant="h5" component="span">
          {`${firstName} ${lastName}`}
          <Chip
            label={active ? 'Active' : 'Inactive'}
            color={active ? 'success' : 'error'}
            size="small"
            style={{ marginLeft: '10px' }}
          />
        </Typography>
      </Box>
      <Grid container display="flex" gap="1rem" mt={5}>
        <Grid item xs={12}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography variant="h6" fontWeight="bold" color="text.secondary">
              Employee ID:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {employeeId}
            </Typography>
          </Grid>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography variant="h6" fontWeight="bold" color="text.secondary">
              Phone:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {phone}
            </Typography>
          </Grid>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography variant="h6" fontWeight="bold" color="text.secondary">
              Address:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {address}
            </Typography>
          </Grid>
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.secondary"
            mt="5px"
          >
            Hire Date
          </Typography>
          <Grid
            item
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Typography variant="body2" color="text.secondary">
              {getHireDate(hireDate)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getTimeWorked(hireDate)}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color={active ? 'error' : 'success'}
            onClick={() => handleActiveChange()}
          >
            {active ? 'Deactivate' : 'Activate'}
          </Button>
          <Button
            variant="contained"
            color="info"
            disabled={currentDepartment == department.id.toString()}
            onClick={() => handleUpdate()}
            style={{ marginLeft: '10px' }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
      <Alert
        show={customAlert.show}
        message={customAlert.message}
        error={customAlert.error}
        setShow={(e: boolean) => setCustomAlert({ ...customAlert, show: e })}
      />
    </Box>
  );
};
