import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ChangeEvent, useEffect, useState } from 'react';

import { useDepartmentList } from '@hooks/departments';
import { employeesClient } from '@lib/employeesClient';

export interface ICreateEmployeeModalProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

export const CreateEmployeeModal: React.FC<ICreateEmployeeModalProps> = ({
  open,
  handleClose,
}) => {
  const [{ departments }, fetchDepartments] = useDepartmentList();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    hireDate: new Date(),
    department: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await employeesClient.create(formData);
    // todo show success message
    alert('Employee created successfully');
    handleClose();
  };

  const handleTextInputChange = (
    event: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name as string]: value as string,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      hireDate: date || new Date(),
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-create-employee" variant="h6" component="h2">
          Create New Employee
        </Typography>
        <Box mt={2}>
          <form onSubmit={handleSubmit}>
            <Grid container display="flex" gap="2rem">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleTextInputChange}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleTextInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Hire Date"
                      value={formData.hireDate}
                      onChange={handleDateChange}
                      defaultValue={new Date()}
                      views={['year', 'month', 'day']}
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={formData.department.toString()}
                    onChange={handleSelectChange}
                  >
                    {departments.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleTextInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleTextInputChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginRight: '10px' }}
                  onClick={() => handleClose()}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
