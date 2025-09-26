import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommend from './components/Recommend';
import { useSubscription } from '@apollo/client';
import { BOOK_ADDED } from './queries';

import './App.css';

const App = () => {
  const [page, setPage] = useState('books');
  const [token, setToken] = useState(null);
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert('new book!');
      console.log('收到数据:', data);
    },
    onError: (err) => console.error('订阅出错', err),
  });
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommend')}>recommend</button>
        )}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && (
          <button
            onClick={() => {
              sessionStorage.clear();
              setToken(null);
            }}
          >
            logout
          </button>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <Recommend show={page === 'recommend'} />
      {token && <NewBook show={page === 'add'} />}
      {!token && (
        <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
      )}
    </div>
  );
};

export default App;
