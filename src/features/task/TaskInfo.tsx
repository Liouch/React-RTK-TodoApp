import { CheckOutlined, RadioButtonUnchecked } from '@mui/icons-material';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Task } from './taskAPI';
import { deleteTaskAsync } from './taskSlice';

type Props = {
  task: Task;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
};
const TaskInfo = ({ task, inputRef }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <Box component='span'>
      <FormGroup
        sx={{
          padding: '0 0 0.25rem 1rem',
          borderBottom: '1px solid lightblue',
          '&:hover': {
            backgroundColor: `${task.completed ? null : '#0078d7cc'}`,
            color: `${task.completed ? null : 'whitesmoke'}`,
          },
        }}
      >
        <FormControlLabel
          sx={{
            marginRight: '0',
            textDecoration: `${task.completed ? 'line-through' : null}`,
          }}
          control={
            <Checkbox
              disabled={!!task.completed}
              sx={{ flexShrink: '0' }}
              icon={
                task.completed ? <CheckOutlined /> : <RadioButtonUnchecked />
              }
              checkedIcon={<CheckOutlined />}
              id={task.id?.toString()}
              onChange={() => {
                dispatch(deleteTaskAsync(task)).then(() =>
                  inputRef?.current?.focus()
                );
              }}
            />
          }
          label={task.title}
        />
      </FormGroup>
    </Box>
  );
};

export default TaskInfo;
