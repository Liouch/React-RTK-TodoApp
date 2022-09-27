import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addTask, deleteTask, fetchTasks, Task } from './taskAPI';

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

export const addTaskAsync = createAsyncThunk(
  'task/addTask',
  async (task: Task) => {
    const response = await addTask(task);
    return response;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'task/deleteTask',
  async (task: Task) => {
    const response = await deleteTask(task);
    return response;
  }
);

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
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        if (typeof action.payload !== 'string') {
          const { id } = action.payload;
          const updatedTaskList = state.tasks.filter((task) => task.id !== id);
          state.tasks = updatedTaskList;
        } else {
          state.error = action.payload;
        }
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.error = action.error.message || 'There was an error';
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        if (typeof action.payload !== 'string') {
          state.tasks.push(action.payload);
        } else {
          state.error = action.payload;
        }
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.error = action.error.message || 'There was an error';
      });
  },
});

export const selectTasks = (state: RootState) => state.task;

export default taskSlice.reducer;
