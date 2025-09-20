import { useEffect } from 'react';
import './app.css';
import Login from './components/Login/Login';
import blogsService from './services/blogs';
import Logout from './components/Logout/Logout';
import Blog from './components/Blog/Blog';
import Msg from './components/Msg/Msg';
import { useQuery } from '@tanstack/react-query';
import { useUser } from './context/UserContext';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Users from './components/Users';
import UsersBlogList from './components/UsersBlogList';

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

function App() {
  const { user, setUser } = useUser();

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogsService.getAll(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>server break~</div>;
  }

  const blogsList = result.data;

  return (
    <>
      <Router>
        <Msg />
        {user?.name ? <Logout user={user} setUser={setUser} /> : <Login />}
        <Routes>
          {/* <Route
            path='/'
            element={
              user?.name ? <Logout user={user} setUser={setUser} /> : <Login />
            }
          /> */}
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<UsersBlogList />} />
          {/* {user?.name ? <Logout user={user} setUser={setUser} /> : <Login />} */}
          {/* {user?.name && <Blog blogsList={blogsList} />} */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
