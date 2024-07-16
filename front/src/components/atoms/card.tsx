import { Card as MuiCard } from '@mui/material';

export interface ICardProps {
  children: React.ReactNode;
}

export const Card: React.FC<ICardProps> = ({ children }) => {
  return <MuiCard sx={{ minWidth: 275 }}>{children}</MuiCard>;
};
