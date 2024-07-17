import { Modal, Box, Typography, Button } from '@mui/material';

export interface IDeleteEmployeeModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
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

export const DeleteEmployeeModal: React.FC<IDeleteEmployeeModalProps> = ({
  open,
  handleClose,
  handleDelete,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-delete-employee" variant="h6" component="h2">
          Delete Employee
        </Typography>
        <Typography
          id="modal-delete-employee-desc"
          variant="body1"
          component="p"
        >
          Are you sure you want to delete this employee?
        </Typography>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete()}
            sx={{ marginRight: '10px' }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
