import { useEffect, useRef, useState } from 'react';
import './app.css';
import Login from './components/Login/Login';
import loginService from './services/login';
import blogsService from './services/blogs';
import Logout from './components/Logout/Logout';
import Blog from './components/Blog/Blog';
import Msg from './components/Msg/Msg';
import Togglable from './components/Togglable';

/**
 * ---task1---
  1. login  form 
  2. The token returned with a successful login is saved to the application's state user.
  3. If a user is not logged in, only the login form is visible.
  4. If the user is logged-in, the name of the user and a list of blogs is shown.

---task2---
  1. Make the login 'permanent' by using the local storage. 
  2. Ensure the browser does not remember the details of the user after logging out.

---task3---
  1. Expand your application to allow a logged-in user to add new blogs

---task4---
  1. Implement notifications that inform the user about successful and unsuccessful operations at the top of the page.
  2. The notifications must be visible for a few seconds. It is not compulsory to add colors.
 * 
 */

interface IUser {
  token: '';
  username: string;
  name: string;
}

interface IMsg {
  type: 'succeed' | 'fail' | null;
  msgContent: string | null;
}

function App() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<IMsg>({
    type: null,
    msgContent: null,
  });
  const [user, setUser] = useState<IUser | null>(null);
  const blogFormRef = useRef('');

  const handleLogin = async () => {
    try {
      const user: IUser = await loginService({ username, password });
      setMessage({
        type: 'succeed',
        msgContent: 'login succeed',
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error: any) {
      setMessage({
        type: 'fail',
        msgContent: error.response.data.error || '未知错误',
      });
      setTimeout(() => {
        setMessage({
          type: null,
          msgContent: null,
        });
      }, 5000);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Msg message={message} setMessage={setMessage} />
      {user?.username ? (
        <Logout user={user} setUser={setUser} />
      ) : (
        <Login
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      )}
      {user?.username && (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <Blog setMessage={setMessage} />
        </Togglable>
      )}
    </>
  );
}

export default App;
