import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

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
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
