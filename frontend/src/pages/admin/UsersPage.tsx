import { useEffect } from "react";
import {
  useGetUsersQuery,
  useLazyGetUsersQuery,
} from "../../redux/api/adminApi";
import { Spinner } from "../../components/Spinner";
import Alert from "../../components/Alert";

export const UsersPage = () => {
  const { data, isError, error, isSuccess, isLoading } = useGetUsersQuery("");
  const [getUsers] = useLazyGetUsersQuery();
  useEffect(() => {
    getUsers("");
  }, []);
  let content;
  if (isLoading)
    content = (
      <div style={{ width: "100%", height: "100%" }}>
        <Spinner />
      </div>
    );
  if (isError) content = <Alert message={error as string} className="danger" />;
  if (isSuccess)
    content = (
      <div className="container">
        <h1>Users</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.isAdmin}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return content;
};
