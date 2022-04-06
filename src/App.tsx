import { Button } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Common/Layout';
import { authActions } from 'features/auth/authSlice';
import LoginPage from 'features/auth/pages/LoginPage';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const loginSuccess = useAppSelector((state) => state.auth.isLoggedInSuccess);
  const navi = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (loginSuccess) {
      navi('/admin');
    } else {
      navi('/login');
    }
  }, [loginSuccess]);

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => dispatch(authActions.logout())}>
        Log Out
      </Button>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
