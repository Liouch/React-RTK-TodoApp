import React from 'react';
import { Task } from './taskAPI';

type Props = {
  task: Task;
};
const TaskInfo = ({ task }: Props) => {
  return <div>{task.title}</div>;
};

export default TaskInfo;
