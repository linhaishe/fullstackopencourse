import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createNote } from '../reducers/anecdoteSlice';

export default function AnecdoteFrom() {
  const dispatch = useDispatch();
  const [note, setNote] = useState('');

  const addNote = async () => {
    // const newNote = await noteService.createNew(note);
    // dispatch({ type: 'notes/createNote', payload: { newNote } });
    dispatch(createNote(note));
    setNote('');
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
