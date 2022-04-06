import { Paper, makeStyles, Typography, Box, Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import * as React from 'react';
import { authActions } from '../authSlice';
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#e6f7ff',
  },
  box: {
    padding: theme.spacing(3),
  },
}));
export default function LoginPage() {
  const classess = useStyle();
  const dispatch = useAppDispatch();
  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };
  return (
    <div className={classess.root}>
      <Paper elevation={1} className={classess.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
