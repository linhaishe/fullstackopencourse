import { createSlice } from '@reduxjs/toolkit';

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      return [...state, action.payload.newNote];
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
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      console.log(888, action.payload);
      return action.payload;
    },
  },
});

export const { createNote, voteNote, appendNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;
