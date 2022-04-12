import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { cityActions, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { selectCityList } from '../../city/citySlice';
import StudentFilter from '../components/Filter';
import StudentTable from '../components/StudentTable';
import {
  selectStudentsFilter,
  selectStudentsList,
  selectStudentsLoading,
  selectStudentsPagination,
  studentActions,
} from '../studentSlice';
const useStyles = makeStyles((theme) => ({
  root: {},
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  pagination: { marginTop: theme.spacing(3), display: 'flex', justifyContent: 'center' },
  loading: { position: 'absolute', top: 70, width: '100%' },
}));
export default function ListPage() {
  const classess = useStyles();
  const filter = useAppSelector(selectStudentsFilter);

  const studentList = useAppSelector(selectStudentsList);
  const pagination = useAppSelector(selectStudentsPagination);
  const loading = useAppSelector(selectStudentsLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);
  const dispatch = useAppDispatch();
  const navi = useNavigate();
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);
  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, []);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };
  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.remove(student?.id || '');
      dispatch(studentActions.setFilter({ ...filter }));
    } catch (error) {
      console.log('Fail to fetch student', error);
    }
  };
  const handleEditStudent = async (student: Student) => {
    navi(`/admin/students/${student.id}`);
  };
  return (
    <Box className={classess.root}>
      {loading && <LinearProgress className={classess.loading} />}
      <Box className={classess.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to="/admin/students/add" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>
      <Box mb={3}>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>
      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onEdit={handleEditStudent}
        onRemove={handleRemoveStudent}
      />
      <Pagination
        className={classess.pagination}
        shape="rounded"
        color="primary"
        count={Math.ceil(pagination?._totalRows / pagination?._limit)}
        page={pagination?._page}
        onChange={handlePageChange}
      />
    </Box>
  );
}
