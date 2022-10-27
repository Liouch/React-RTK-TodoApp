import { Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import TaskInfo from './TaskInfo';
import { fetchTasksAsync, selectTasks } from './taskSlice';

type TaskType = 'Completed' | 'Todo';

const TaskList = () => {
  const task = useAppSelector(selectTasks);
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  const renderTasks = () => {
    const reversedTaskToDoArray = [...task.tasks.toDo].reverse();
    const taskCompletedArray = [...task.tasks.completed];

    const renderTasks = (taskCompleted: TaskType) => {
      if (taskCompleted === 'Todo') {
        if (reversedTaskToDoArray.length === 0) {
          return <span>Add a task!</span>;
        } else {
          return reversedTaskToDoArray.map((task) => (
            <TaskInfo key={task.id} task={task} />
          ));
        }
      }
      if (taskCompleted === 'Completed') {
        if (taskCompletedArray.length === 0) {
          return <span>Complete a task!</span>;
        } else {
          return taskCompletedArray.map((task) => (
            <TaskInfo key={task.id} task={task} />
          ));
        }
      }
    };

    return (
      <Box component='div' minWidth='75%' sx={{ paddingX: '10%' }}>
        <Box minHeight='25%'>
          <h3>Tasks to do:</h3>
          <div>{renderTasks('Todo')}</div>
        </Box>
        <Box mt='2rem'>
          <h3>Task completed:</h3>
          <div>{renderTasks('Completed')}</div>
        </Box>
      </Box>
    );
  };

  const renderContent = () => {
    let content = null;
    if (task.error) {
      content = <div>Error: {task.error}</div>;
      return content;
    }
    if (task.loading) {
      content = <span>Loading...</span>;
    } else if (
      !task.loading &&
      (task.tasks.toDo.length > 0 || task.tasks.completed.length > 0)
    ) {
      content = renderTasks();
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
