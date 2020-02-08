import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getPasswords } from "../store/actions/";

export default function Passwords(props) {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPasswords());
  }, [dispatch]);

  let { passwords } = props;
  return (
    <div id="passwords-list">
      <Table data-testid="passwords-list" striped bordered hover>
        <thead>
          <tr>
            <th>URL</th>
            <th>Username/Email</th>
            <th>Password</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
          </tr>
        </thead>
        <tbody data-testid="password-table">
          {passwords.map(record => (
            <tr role="listitem" key={Math.random()}>
              <td>{record.url}</td>
              <td>{record.login}</td>
              <td>{record.password}</td>
              <td>{String(new Date(record.createdAt.seconds))}</td>
              <td>{String(new Date(record.updatedAt.seconds))}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
