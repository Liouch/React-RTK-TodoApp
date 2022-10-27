import React from 'react';
import './App.css';
import TaskList from './features/task/TaskList';
import AddTask from './features/task/AddTask';

function App() {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  return (
    <div className='App'>
      <header className='App-header'>
        <AddTask inputRef={inputRef}/>
        <TaskList inputRef={inputRef} />
      </header>
    </div>
  );
}

export default App;
