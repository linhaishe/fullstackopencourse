import './Login.css';

interface ILoginProps {
  handleLogin: (username: string, password: string) => void;
  setUsername: (name: string) => void;
  setPassword: (name: string) => void;
  username: string;
  password: string;
}

export default function Login(props: ILoginProps) {
  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.handleLogin(props.username, props.password);
        }}
      >
        <div>
          <label>
            username:
            <input
              type='text'
              value={props.username}
              onChange={({ target }) => props.setUsername(target.value)}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            password:
            <input
              type='password'
              value={props.password}
              onChange={({ target }) => props.setPassword(target.value)}
            />
          </label>
        </div>
        <br />
        <button type='submit'>login</button>
      </form>
    </div>
  );
}
