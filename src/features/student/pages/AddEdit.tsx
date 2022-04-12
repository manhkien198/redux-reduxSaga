import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();
  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log('Fail to fetch student details :', error);
      }
    })();
  }, [studentId]);

  return (
    <Box>
      <Link to="/admin/students">
        <Typography style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft />
          Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>
    </Box>
  );
}
