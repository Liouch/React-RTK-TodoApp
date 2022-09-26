import axios from 'axios';

export type Task = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

const TASK_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export async function fetchTasks() {
  const response = await axios.get(`${TASK_BASE_URL}?completed=false`);
  return response.data;
}

export async function addTask(newTask: Task) {
  const response = await axios.post(TASK_BASE_URL, newTask);
  return response.data;
}

export async function deleteTask(task: Task) {
  const response = await axios.delete(`${TASK_BASE_URL}/${task.id}`);
  if (response.status === 200) {
    return task;
  }
  return `${response.status}: ${response.statusText}`;
}
