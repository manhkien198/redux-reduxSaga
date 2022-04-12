import { NotFound } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import Dashboard from 'features/dashboard';
import AddEditPage from 'features/student/pages/AddEdit';
import ListPage from 'features/student/pages/ListPage';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
function App() {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<ListPage />} />
          <Route path="students/add" element={<AddEditPage />} />
          <Route path="students/:studentId" element={<AddEditPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
