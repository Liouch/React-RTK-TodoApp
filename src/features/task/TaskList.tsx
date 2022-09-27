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
      content = <div>loading</div>;
    } else if (!task.loading && task.tasks.length > 0) {
      const reversedTaskArray = [...task.tasks].reverse();
      content = (
        <div>
          {reversedTaskArray.map((task) => (
            <TaskInfo key={task.id} task={task} />
          ))}
        </div>
      );
    }
    return content;
  };
  return <div>{renderContent()}</div>;
};

export default TaskList;
