import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Task } from './taskAPI';
import { deleteTaskAsync } from './taskSlice';

type Props = {
  task: Task;
};
const TaskInfo = ({ task }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div>
      <label>
        <input
          type='checkbox'
          id={task.id?.toString()}
          onChange={() => dispatch(deleteTaskAsync(task))}
        />
        {task.title}
      </label>
    </div>
  );
};

export default TaskInfo;
