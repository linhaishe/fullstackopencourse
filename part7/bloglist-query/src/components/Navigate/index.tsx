import { Link } from 'react-router-dom';

export default function Index() {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to='/'>
        blogs
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
    </div>
  );
}
