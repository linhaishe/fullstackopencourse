import { useState, SyntheticEvent } from 'react';

import {
  TextField,
  Grid,
  Button,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import { DiaryFormValues, VisibilityE, WeatherE } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: DiaryFormValues) => void;
}

interface WeatherOptions {
  value: WeatherE;
  label: string;
}

interface VisibilityOption {
  value: VisibilityE;
  label: string;
}

const weatherOptions: WeatherOptions[] = Object.values(WeatherE).map((v) => ({
  value: v,
  label: v.toString(),
}));

const visibilityOptions: VisibilityOption[] = Object.values(VisibilityE).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
);

const AddDiaryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState(VisibilityE.GOOD);
  const [weather, setWeather] = useState(WeatherE.CLOUDY);
  const [comment, setComments] = useState('');

  const addDiary = (event: SyntheticEvent) => {
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
      <form onSubmit={addDiary}>
        <TextField
          label='Date'
          placeholder='YYYY-MM-DD'
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label='comments'
          fullWidth
          value={comment}
          onChange={({ target }) => setComments(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>weather</InputLabel>
        <RadioGroup
          row
          value={weather}
          onChange={({ target }) => setWeather(target.value as WeatherE)}
        >
          {weatherOptions?.map((v) => (
            <FormControlLabel
              value={v.value}
              control={<Radio />}
              label={v.label}
            />
          ))}
        </RadioGroup>
        <InputLabel style={{ marginTop: 20 }}>visibility</InputLabel>
        <RadioGroup
          row
          value={visibility}
          onChange={({ target }) => setVisibility(target.value as VisibilityE)}
        >
          {visibilityOptions?.map((v) => (
            <FormControlLabel
              value={v.value}
              control={<Radio />}
              label={v.label}
            />
          ))}
        </RadioGroup>
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
