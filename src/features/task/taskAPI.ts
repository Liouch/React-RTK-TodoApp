import axios from 'axios';

export type Task = {
  id?: number;
  userId: number;
  title: string;
  completed: boolean;
};

const TASK_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export async function fetchTasks() {
  const response = await axios.get(
    `${TASK_BASE_URL}?completed=false&_limit=10`
  );
  return response.data;
}

export async function addTask(newTask: Task) {
  const response = await axios.post(TASK_BASE_URL, newTask);
  // to get an ID above 300
  const newId = Math.floor(Math.random() * 101 + 300);
  const newModidifiedTask: Task = { ...response.data, id: newId };
  return newModidifiedTask;
}

export async function deleteTask(task: Task) {
  const response = await axios.delete(`${TASK_BASE_URL}/${task.id}`);
  if (response.status === 200) {
    return task;
  }
  return `${response.status}: ${response.statusText}`;
}
