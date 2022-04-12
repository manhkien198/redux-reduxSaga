import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import {
  selectStudentsFilter,
  selectStudentsList,
  selectStudentsLoading,
  selectStudentsPagination,
  studentActions,
} from '../studentSlice';
import Box from '@mui/material/Box';
import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import StudentTable from '../components/StudentTable';
import { Pagination } from '@mui/material';
import { cityActions, selectCityMap } from 'features/city/citySlice';
import StudentFilter from '../components/Filter';
import { selectCityList } from '../../city/citySlice';
import { ListParams } from 'models';
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
  return (
    <Box className={classess.root}>
      {loading && <LinearProgress className={classess.loading} />}
      <Box className={classess.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>
      <Box mb={3}>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>
      <StudentTable studentList={studentList} cityMap={cityMap} />
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
