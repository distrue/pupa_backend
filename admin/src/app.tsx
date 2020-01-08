import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { backUrl } from './config';

interface User {
  memberships: any[];
  requests: any[];
  plusfriendUserKey: string;
}

export default () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    Axios.get(`${backUrl}/admin/api/users`, { withCredentials: true }).then((res) => {
      setUsers(res.data);
    });
  }, []);
  return (
    <div>
      <h4>membership request</h4>
      <Table>
        <thead>
          <th>userID</th>
          <th>imageUrl</th>
          <th>status</th>
          <th>accept</th>
          <th>decline</th>
        </thead>
        <tbody>
          {users.map((item: User) => item.requests.map((request: any) => (
            <tr>
              <td>{item.plusfriendUserKey}</td>
              <td>{request.imageUrl}</td>
              <td>{'wait'}</td>
              <td><button type="button">A</button></td>
              <td><button type="button">D</button></td>
            </tr>
          )))}
        </tbody>
      </Table>
    </div>
  );
};

const Table = styled.table`
  position: relative; width: auto;
  table-layout: fixed;
    td{
      padding: 0px 10px 0px 10px;
      max-width: 100px;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 40px;
      button{
        width: 25px;
      }
    }
    td:nth-child(2) {
      width: 200px;
      max-width: 200px;
      overflow: scroll;
      text-overflow: clip;
    }
`;
