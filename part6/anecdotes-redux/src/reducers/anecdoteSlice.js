import { createSlice } from '@reduxjs/toolkit';
import noteService from '../services/notes';

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    voteNote(state, action) {
      return [
        ...state.filter((note) => note.id !== action.payload.id),
        action.payload,
      ].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));
    },
    appendNote(state, action) {
      return [...state, action.payload];
    },
    setNotes(state, action) {
      return action.payload.sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));
    },
  },
});

export const { voteNote, appendNote, setNotes } = noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const note = state?.notes?.find((n) => n.id === id);
    const updated = await noteService.voteNote(id, (note.votes || 0) + 1);
    dispatch(voteNote(updated));
  };
};

export default noteSlice.reducer;
