import { Box, Button, TextField } from '@mui/material';
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

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickHandler = () => {
    if (!inputValue) {
      alert('Please write a task first');
    } else {
      dispatch(addTaskAsync(newTask))
        .then(() => {
          setInputValue('');
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <Box
      sx={{
        position: 'sticky',
        top: '0',
        backgroundColor: '#0078D7',
        padding: '1rem',
        marginBottom: '1rem',
      }}
    >
      <Box
        component='form'
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          onClickHandler();
        }}
      >
        <TextField
          id='oulined-required'
          placeholder='Add a new task'
          value={inputValue}
          size='small'
          required
          onChange={onChangeHandler}
          sx={{
            flexGrow: '1',
            '& .MuiInputBase-input': {
              backgroundColor: '#fff',
              borderRadius: 'inherit',
            },
          }}
        />
        <Button
          variant='outlined'
          onClick={onClickHandler}
          type='submit'
          sx={{ backgroundColor: '#fff' }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddTask;
