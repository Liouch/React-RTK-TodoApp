import { CheckOutlined, RadioButtonUnchecked } from '@mui/icons-material';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Task } from './taskAPI';
import { deleteTaskAsync } from './taskSlice';

type Props = {
  task: Task;
};
const TaskInfo = ({ task }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <Box component='span'>
      <FormGroup
        sx={{
          padding: '0 0 0.25rem 1rem',
          borderBottom: '1px solid lightblue',
          '&:hover': {
            backgroundColor: '#0078d7cc',
            color: 'whitesmoke',
          },
        }}
      >
        <FormControlLabel
          sx={{ marginRight: '0' }}
          control={
            <Checkbox
              sx={{ flexShrink: '0' }}
              icon={<RadioButtonUnchecked />}
              checkedIcon={<CheckOutlined />}
              id={task.id?.toString()}
              onChange={() => dispatch(deleteTaskAsync(task))}
            />
          }
          label={task.title}
        />
      </FormGroup>
    </Box>
  );
};

export default TaskInfo;
