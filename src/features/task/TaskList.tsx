import { Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import TaskInfo from './TaskInfo';
import { fetchTasksAsync, selectTasks } from './taskSlice';

const TaskList = () => {
  const task = useAppSelector(selectTasks);
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  const renderContent = () => {
    let content = null;
    if (task.error) {
      content = <div>Error: {task.error}</div>;
      return content;
    }
    if (task.loading) {
      content = <span>Loading...</span>;
    } else if (!task.loading && task.tasks.length === 0) {
      content = <span>Add a new task</span>;
    } else if (!task.loading && task.tasks.length > 0) {
      const reversedTaskArray = [...task.tasks].reverse();
      content = (
        <Box component='div' sx={{ paddingX: '10%' }}>
          <div>
            {reversedTaskArray.map((task) => (
              <TaskInfo key={task.id} task={task} />
            ))}
          </div>
        </Box>
      );
    }
    return content;
  };
  return (
    <Box display='flex' justifyContent='center'>
      {renderContent()}
    </Box>
  );
};

export default TaskList;
