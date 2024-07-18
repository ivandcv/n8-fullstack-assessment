import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect } from 'react';
import { IDepartmentHistory } from 'src/models';
import { useDepartmentHistoryList } from '@hooks/departmentHistory';

export interface IDepartmentHistoryTableProps {
  employeeId: number
}

export const DepartmentHistoryTable: React.FC<IDepartmentHistoryTableProps> = ({
  employeeId
}) => {
  const [{ history = [] }, fetchDepartmentHistory] = useDepartmentHistoryList();

  useEffect(() => {
    fetchDepartmentHistory(employeeId);
  }, [employeeId]);

  const parseDate = (date: Date) => {
    const changedAt = new Date(date)
    return <>{changedAt.toLocaleDateString()}</>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((row: IDepartmentHistory) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {parseDate(row.changedAt)}
              </TableCell>
              <TableCell align="right">{row.department.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
