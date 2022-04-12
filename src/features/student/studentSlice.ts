import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, Student } from 'models';
import { ListResponse, PaginationParams } from '../../models/common';
export interface StudentState {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}
const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};
const studentSlice = createSlice({
  name: 'student',
  initialState: initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchStudentListFail(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});
export const selectStudentsList = (state: RootState) => state.student.list;
export const selectStudentsLoading = (state: RootState) => state.student.loading;
export const selectStudentsFilter = (state: RootState) => state.student.filter;
export const selectStudentsPagination = (state: RootState) => state.student.pagination;
export const studentActions = studentSlice.actions;
const studentReducer = studentSlice.reducer;
export default studentReducer;
