// reducers/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Welcome to the app!';
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return '';
    },
  },
});

let timeoutId; // 用于保存 setTimeout ID，保证每次通知刷新时可以清掉上一次的

export const showNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification(message));

    if (timeoutId) {
      clearTimeout(timeoutId); // 清掉上一次的定时器
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
