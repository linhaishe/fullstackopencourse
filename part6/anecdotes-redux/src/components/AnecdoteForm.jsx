import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function AnecdoteFrom() {
  const dispatch = useDispatch();
  const [note, setNote] = useState('');
  const addNote = () => {
    dispatch({ type: 'notes/createNote', payload: { newNote: note } });
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
