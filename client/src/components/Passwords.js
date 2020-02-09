import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPasswords, setLoading } from "../store/actions/";
import Spinner from "react-spinkit";

import PasswordCard from "./PasswordCard";
export default function Passwords(props) {
  let isLoading = useSelector(state => state.isLoading);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getPasswords());
  }, [dispatch]);
  let { passwords } = props;
  return (
    <div data-testid="passwords-list" id="passwords-list" className="row">
      {!isLoading &&
        passwords.map(record => (
          <div className="col-md-3" key={Math.random()}>
            <PasswordCard record={record} />
          </div>
        ))}
      {isLoading && <Spinner id="spin-loader" name="double-bounce" />}
      {/* {isLoading && <h1>WOI</h1>} */}
    </div>
  );
}
