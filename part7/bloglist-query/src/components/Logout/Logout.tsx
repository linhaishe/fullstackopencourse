import './Logout.css';

export default function Logout(props: any) {
  return (
    <div className='logoutWrap'>
      <h2>{`${props?.user?.name} login succeeded`}</h2>
      <div
        className='logoutBtn'
        onClick={() => {
          window.localStorage.removeItem('loggedUser');
          props.setUser(null);
        }}
      >
        logout
      </div>
    </div>
  );
}
