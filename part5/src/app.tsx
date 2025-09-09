import { useEffect, useState } from 'react';
import './app.css';
import Login from './components/Login/Login';
import Blogs from './components/Blogs/Blogs';
import loginService from './services/login';
import blogsService from './services/blogs';
import Logout from './components/Logout/Logout';

/**
 * ---task1---
  1. login  form 
  2.  The token returned with a successful login is saved to the application's state user.
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

function App() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [newBlog, setNewBlog] = useState('');
  const [showAll, setShowAll] = useState(true);

  const handleLogin = async () => {
    try {
      const user: IUser = await loginService({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMsg('wrong credentials');
      setTimeout(() => {
        setErrorMsg(null);
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
      <Blogs />
    </>
  );
}

export default App;
