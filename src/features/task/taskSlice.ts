import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchTasks, Task } from './taskAPI';

export type InitialState = {
  loading: boolean;
  tasks: Task[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  tasks: [],
  error: '',
};

export const fetchTasksAsync = createAsyncThunk('task/fetchTasks', async () => {
  const response = await fetchTasks();
  return response;
});

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = '';
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.tasks = [];
        state.error = action.error.message || 'There was an error';
      });
  },
});

export const selectTasks = (state: RootState) => state.task;

export default taskSlice.reducer;
