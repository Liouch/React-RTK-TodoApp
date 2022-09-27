import React from 'react';
import './App.css';
import TaskList from './features/task/TaskList';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div>Input + button to add tasks</div>
        <hr></hr>
        <TaskList />
      </header>
    </div>
  );
}

export default App;
