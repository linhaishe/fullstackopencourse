import { useState, SyntheticEvent } from 'react';

import { TextField, Grid, Button } from '@mui/material';

import { DiaryFormValues } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: DiaryFormValues) => void;
}

const AddDiaryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComments] = useState('');

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      visibility,
      weather,
      comment,
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label='Date'
          placeholder='YYYY-MM-DD'
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label='visibility'
          fullWidth
          value={visibility}
          onChange={({ target }) => setVisibility(target.value)}
        />
        <TextField
          label='weather'
          fullWidth
          value={weather}
          onChange={({ target }) => setWeather(target.value)}
        />

        <TextField
          label='comments'
          fullWidth
          value={comment}
          onChange={({ target }) => setComments(target.value)}
        />

        <Grid>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              style={{ float: 'left' }}
              type='button'
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type='submit'
              variant='contained'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddDiaryForm;
