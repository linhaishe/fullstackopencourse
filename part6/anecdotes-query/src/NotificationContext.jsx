import { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

const initialState = '';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'CLEAR':
      return '';
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  let timeoutId; // 用于保存 setTimeout ID，保证每次通知刷新时可以清掉上一次的

  const showNotification = (message, seconds = 5) => {
    dispatch({ type: 'SET', payload: message });
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, seconds * 1000);
  };

  return (
    <NotificationContext.Provider
      value={{ notification: state, showNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// 自定义 hook
export const useNotification = () => useContext(NotificationContext);
