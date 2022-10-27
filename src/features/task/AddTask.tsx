import { Box, Button, TextField, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Task } from './taskAPI';
import { addTaskAsync } from './taskSlice';

type Props = {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
};

const AddTask = ({ inputRef }: Props) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  console.log(isMobile);

  const newTask: Task = {
    userId: 1,
    title: inputValue,
    completed: false,
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickHandler = () => {
    if (!inputValue || inputValue.trim() === '') {
      alert('Please write a task first');
    } else {
      dispatch(addTaskAsync(newTask))
        .then(() => {
          setInputValue('');
          inputRef.current?.focus();
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <Box
      position='sticky'
      top='0'
      bgcolor='#0078D7'
      padding='1rem'
      marginBottom='1rem'
      zIndex='1'
    >
      <Box
        component='form'
        display='flex'
        justifyContent='center'
        flexWrap='wrap'
        gap={2}
        onSubmit={(e) => {
          e.preventDefault();
          onClickHandler();
        }}
      >
        <TextField
          inputRef={inputRef}
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
            maxWidth: `${isMobile ? '100%' : '50%'}`,
          }}
        />
        <Button
          variant='outlined'
          type='submit'
          sx={{
            backgroundColor: '#fff',
            '&:hover': {
              color: '#1976d2',
              backgroundColor: '#fff',
            },
          }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddTask;
