import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Student } from 'models';
import { makeStyles } from '@material-ui/core';
export interface StudentRankingListProps {
  studentList: Student[];
}
const useStyles = makeStyles((theme) => ({
  table: {},
}));
export default function StudentRankingList({ studentList }: StudentRankingListProps) {
  const classess = useStyles();
  return (
    <TableContainer>
      <Table className={classess.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Mark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell component="th" scope="row" align="center">
                {idx + 1}
              </TableCell>
              <TableCell align="left">{student.name}</TableCell>
              <TableCell align="right">{student.mark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
