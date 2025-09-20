import { useQuery } from '@tanstack/react-query';
import usersService from '../../services/users';

export default function Users() {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: usersService,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>server break~</div>;
  }

  const usersList: any = result.data;

  console.log('usersList', usersList);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>blog created</th>
          </tr>
        </thead>
        <tbody>
          {usersList?.map((user: any) => {
            return (
              <tr>
                <td>{user?.username}</td>
                <td>{user?.blogs?.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
