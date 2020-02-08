import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownButton, Dropdown } from "react-bootstrap";

import PasswordForm from "../components/PasswordForm";
import Passwords from "../components/Passwords";
import Sidebar from "../components/Sidebar";

import { searchPasswords, getPasswords } from "../store/actions/";
export default function Home() {
  let searchResults = useSelector(state => state.searchResultPasswords);
  const [isSearching, setIsSearching] = useState(false);

  let allPasswords = useSelector(state => state.passwords);
  const [passwords, setPasswords] = useState(allPasswords);

  const [keyword, setKeyword] = useState("");
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
    setKeyword(event.target.value);
    dispatch(searchPasswords(event.target.value));
  };

  return (
    <div className="row">
      <div className="col-md-2 sidebar">
        <Sidebar />
      </div>
      <div className="col-md-10">
        <div className="row home-header">
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-1">
                <img
                  src={require("../images/boxes.png")}
                  width="40"
                  height="30"
                  id="nav-logo-img"
                />
              </div>
              <div className="col-md-11">
                <h4>P A S S W O R D I O</h4>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <form>
              <div className="input-group mb-3">
                <div id="search-icon-div">
                  <img
                    src={require("../images/search-icon.png")}
                    height="30"
                    width="30"
                    id="search-icon-img"
                  />
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                  aria-label="Search here..."
                  aria-describedby="basic-addon2"
                  value={keyword}
                  onChange={handleSearchChange}
                  data-testid="search-bar-input"
                />
              </div>
            </form>
          </div>
          <div className="col-md-4">
            <div id="user-info-div">
              <h6>
                <img
                  src={require("../images/user-icon.png")}
                  width="30"
                  height="30"
                  id="user-icon"
                />
                <b>johndoe@mail.com</b>
              </h6>
            </div>
          </div>
        </div>
        <div className="row" id="display-options">
          <div id="order-dropdown">
            <DropdownButton variant="transparent" title="Name">
              <Dropdown.Item href="#/action-1">Ascending</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Descending</Dropdown.Item>
            </DropdownButton>
          </div>
          <div id="records-dropdown">
            <DropdownButton
              variant="transparent"
              id="records-dropdown"
              title="All Records"
            >
              <Dropdown.Item href="#/action-1">Ascending</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Descending</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <Passwords aria-label="passwords-list" passwords={passwords} />
      </div>
    </div>
  );
}
