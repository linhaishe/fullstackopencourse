import { useEffect, useState, type FormEvent } from 'react';
import './App.css';
import Login from './components/Login/Login';
import loginService from './services/login';

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

function App() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState(null);

  function handleLogin(): void {
    // throw new Error('Function not implemented.');
    console.log('event', username, password);
  }

  useEffect(() => {}, []);

  return (
    <>
      <Login
        handleLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
        username={username}
        password={password}
      />
    </>
  );
}

export default App;
