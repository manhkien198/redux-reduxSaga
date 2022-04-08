import { Box } from '@material-ui/core';
import { Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';

export default function StudentFeature() {
  return (
    <Box>
      <Routes>
        <Route path="/">
          <Route path="add" element={<ListPage />} />
        </Route>
      </Routes>
    </Box>
  );
}
