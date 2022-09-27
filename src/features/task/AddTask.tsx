import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Task } from './taskAPI';
import { addTaskAsync } from './taskSlice';

const AddTask = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const dispatch: AppDispatch = useDispatch();

  const newTask: Task = {
    userId: 1,
    title: inputValue,
    completed: false,
  };

  const onChangeHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickHandler = () => {
    if (!inputValue) {
      alert('Please write a task first');
    } else {
      dispatch(addTaskAsync(newTask));
      setInputValue('');
    }
  };
  return (
    <div>
      <input
        type='text'
        placeholder='Add task'
        value={inputValue}
        onChange={onChangeHanlder}
        tabIndex={0}
      />
      <button onClick={onClickHandler} tabIndex={0}>
        Add
      </button>
    </div>
  );
};

export default AddTask;
