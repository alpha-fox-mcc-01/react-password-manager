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
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>URL</th>
            <th>Username</th>
            <th>Password</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map(record => (
            <tr key={Math.random()}>
              <td>{record.url}</td>
              <td>{record.username}</td>
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
