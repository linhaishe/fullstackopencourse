import ReactDOM from 'react-dom/client';
// import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import noteReducer from './reducers/anecdoteReducer';
import { configureStore } from '@reduxjs/toolkit';
// const store = createStore(counterReducer);
const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
