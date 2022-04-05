import React, { useEffect } from 'react';

import cityApi from 'api/cityApi';
import { Routes, Route } from 'react-router-dom';
import LoginPage from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/Common/Layout';
import { NotFound, PrivateRoute } from 'components/Common';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/admin" element={<AdminLayout />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
