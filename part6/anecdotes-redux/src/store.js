import noteReducer from './reducers/anecdoteSlice';
import notificationReducer from './reducers/notificationSlice';
import { configureStore } from '@reduxjs/toolkit';
// import { createStore } from 'redux';

// const store = createStore(counterReducer);
const store = configureStore({
  reducer: {
    notes: noteReducer,
    notification: notificationReducer,
  },
});

export default store;
