import { Box, makeStyles } from '@material-ui/core';
import Header from 'components/Common/Header';
import * as React from 'react';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '300px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  main: {
    gridArea: 'main',
  },
}));
export function AdminLayout() {
  const classess = useStyle();
  return (
    <Box className={classess.root}>
      <Box className={classess.header}>
        <Header />
      </Box>
      <Box className={classess.sidebar}>Sidebar</Box>
      <Box className={classess.main}>Main</Box>
    </Box>
  );
}
