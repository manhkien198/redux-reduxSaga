import { Box, makeStyles } from '@material-ui/core';
import { Header, Sidebar } from 'components/Common';
import Dashboard from 'features/dashboard';
import StudentFeature from 'features/student';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));
export function AdminLayout() {
  const classess = useStyle();
  return (
    <Box className={classess.root}>
      <Box className={classess.header}>
        <Header />
      </Box>
      <Box className={classess.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classess.main}>
        <Routes>
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/students" element={<StudentFeature />} />
        </Routes>
      </Box>
    </Box>
  );
}
