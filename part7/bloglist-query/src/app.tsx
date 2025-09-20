import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Blog from './components/Blog/Blog';
import Msg from './components/Msg/Msg';
import { useUser } from './context/UserContext';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Users from './components/Users';
import UsersBlogList from './components/UsersBlogList';
import './app.css';
import SingleBlogItem from './components/SingleBlogItem';

function App() {
  const { user, setUser } = useUser();

  return (
    <>
      <Router>
        <Msg />
        {user?.name ? <Logout user={user} setUser={setUser} /> : <Login />}
        <Routes>
          <Route path='/' element={user?.name && <Blog setUser={setUser} />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<UsersBlogList />} />
          <Route path='/blogs/:id' element={<SingleBlogItem />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
