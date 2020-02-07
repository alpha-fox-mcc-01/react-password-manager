import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PasswordForm from "../components/PasswordForm";
import Passwords from "../components/Passwords";

import { searchPasswords, getPasswords } from "../store/actions/";
export default function Home() {
  let searchResults = useSelector(state => state.searchResultPasswords);
  const [isSearching, setIsSearching] = useState(false);

  let allPasswords = useSelector(state => state.passwords);
  const [passwords, setPasswords] = useState(allPasswords);

  useEffect(() => {
    if (isSearching) {
      setPasswords(searchResults);
    } else {
      setPasswords(allPasswords);
    }
  }, [isSearching, searchResults, allPasswords]);

  let dispatch = useDispatch();

  const handleSearchChange = event => {
    if (event.target.value.length) setIsSearching(true);
    else setIsSearching(false);
    dispatch(searchPasswords(event.target.value));
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <form data-testid="password-search-bar">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
                aria-label="Search here..."
                aria-describedby="basic-addon2"
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
        <div className="col-md-8" data-testid="add-password-modal">
          <PasswordForm aria-label="password-form-modal" />
        </div>
      </div>
      <Passwords aria-label="passwords-list" passwords={passwords} />
    </div>
  );
}
