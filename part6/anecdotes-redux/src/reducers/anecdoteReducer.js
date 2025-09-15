import { createSlice } from '@reduxjs/toolkit';
import { initialState, asObject } from '../const';

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      return [...state, asObject(action.payload.newNote)];
    },
    voteNote(state, action) {
      return [...state]
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, votes: (item?.votes || 0) + 1 }
            : item
        )
        .sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));
    },
  },
});

export const { createNote, voteNote } = noteSlice.actions;
export default noteSlice.reducer;
