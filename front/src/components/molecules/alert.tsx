import { Alert as MuiAlert } from '@mui/material';
import { Check } from '@mui/icons-material';
import { useEffect } from 'react';

export interface IAlertProps {
  show: boolean;
  message: string;
  error: boolean;
  setShow: (show: boolean) => void;
}

export const Alert: React.FC<IAlertProps> = ({
  show,
  message,
  error,
  setShow,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);
  return (
    <>
      {show && (
        <MuiAlert
          icon={<Check fontSize="inherit" />}
          severity={error ? 'error' : 'success'}
          style={{
            position: 'fixed',
            top: '8px',
            right: '10px',
            zIndex: 2,
          }}
        >
          {message}
        </MuiAlert>
      )}
    </>
  );
};
