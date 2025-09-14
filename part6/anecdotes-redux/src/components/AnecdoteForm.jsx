import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/anecdoteReducer';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function AnecdoteFrom() {
  const dispatch = useDispatch();
  const [note, setNote] = useState('');
  const addNote = () => {
    dispatch(createNote(note));
  };
  return (
    <div>
      <div>
        <input
          value={note}
          onChange={(e) => {
            e.preventDefault();
            setNote(e.target.value);
          }}
        />
      </div>
      <button onClick={addNote}>create</button>
    </div>
  );
}

AnecdoteFrom.propTypes = {
  anecdotes: PropTypes.array.isRequired,
};
