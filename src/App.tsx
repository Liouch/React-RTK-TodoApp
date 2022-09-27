import React from 'react';
import './App.css';
import TaskList from './features/task/TaskList';
import AddTask from './features/task/AddTask';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <AddTask />
        <TaskList />
      </header>
    </div>
  );
}

export default App;
