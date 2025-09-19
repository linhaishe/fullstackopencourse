import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMsg } from '../../context/MsgContext';
import { useField } from '../../hooks';
import loginService from '../../services/login';
import blogsService from '../../services/blogs';
import { useUser } from '../../context/UserContext';
import './Login.css';

export default function Login() {
  const { reset: titleReset, ...usernameInput } = useField('text');
  const { reset: authorReset, ...passwordInput } = useField('password');
  const { showMsg } = useMsg();
  const queryClient = useQueryClient();
  const { setUser } = useUser();

  const loginMutation = useMutation({
    mutationFn: loginService,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setUser(user);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogsService.setToken(user.token);
      showMsg({
        msgContent: 'login succeed',
        isError: false,
      });
    },
    onError: (err: any) => {
      showMsg({
        msgContent: err?.response?.data?.error,
        isError: true,
      });
    },
  });

  const handleLogin = async (username: any, password: any) => {
    try {
      loginMutation.mutate({ username, password });
    } catch (error: any) {
      showMsg({
        msgContent: 'login fail',
        isError: true,
      });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin(usernameInput.value, passwordInput.value);
        }}
      >
        <div>
          <label>
            username:
            <input {...usernameInput} />
          </label>
        </div>
        <br />
        <div>
          <label>
            password:
            <input {...passwordInput} />
          </label>
        </div>
        <br />
        <button type='submit'>login</button>
      </form>
    </div>
  );
}
