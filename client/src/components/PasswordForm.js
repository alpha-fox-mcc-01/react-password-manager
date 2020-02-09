import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";

import { requestAddPassword, setLoading } from "../store/actions/";

export default function PasswordForm() {
  let dispatch = useDispatch();
  // Ini buat toggle modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [url, setUrl] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // errors
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [special, setSpecial] = useState(true);
  const [number, setNumber] = useState(true);
  const [length, setLength] = useState(true);

  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

  const handleLoginChange = event => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    if (password.toLowerCase() !== password) {
      setUpperCase(false);
    } else setUpperCase(true);
    if (password.toUpperCase() !== password) {
      setLowerCase(false);
    } else setLowerCase(true);
    if (new RegExp("^(?=.*[!@#$%^&*])").test(password)) {
      setSpecial(false);
    } else setSpecial(true);
    if (new RegExp("[0-9]").test(password)) {
      setNumber(false);
    } else setNumber(true);
    if (password.length > 5) {
      setLength(false);
    } else setLength(true);
  }, [password]);

  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(setLoading());
    dispatch(
      requestAddPassword({
        url,
        login,
        password
      })
    );
    handleClose();
  };
  return (
    <>
      <Button
        data-testid="password-form-modal"
        variant="warning"
        id="add-new-btn"
        onClick={handleShow}
      >
        <img
          src={require("../images/add-icon.png")}
          height="30"
          width="30"
          id="create-btn-image"
          alt="create-btn"
        />
        <span id="create-btn-text">Create New</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Password Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputURL1">URL</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputURL1"
                aria-describedby="URLHelp"
                placeholder="Enter URL"
                data-testid="url-input"
                onChange={handleUrlChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputLogin1">Login</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputLogin1"
                placeholder="Email/Username"
                data-testid="login-input"
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                data-testid="password-input"
                onChange={handlePasswordChange}
              />
              <small id="passwordHelp" className="form-text text-muted">
                We'll never share your passwords with anyone else.
              </small>
              <br />
              <p style={{ lineHeight: "60%" }}>
                <b>
                  <u>Password Strength</u>:&nbsp;
                  {(upperCase || lowerCase || special || number || length) && (
                    <span className="errors">Not Recommended</span>
                  )}
                  {!(upperCase || lowerCase || special || number || length) && (
                    <span className="proper">Ok</span>
                  )}
                </b>
              </p>
              {upperCase && (
                <p className="errors">
                  &bull;&nbsp;Password should have at least one upper-case
                  letter.
                </p>
              )}
              {lowerCase && (
                <p className="errors">
                  &bull;&nbsp;Password should have at least one lower-case
                  letter.
                </p>
              )}
              {special && (
                <p className="errors">
                  &bull;&nbsp;Password should have at least one special
                  character ( #$@!%).
                </p>
              )}
              {number && (
                <p className="errors">
                  &bull;&nbsp;Password should have at least one number.
                </p>
              )}
              {length && (
                <p className="errors">
                  &bull;&nbsp;Password should be longer than 5 characters.
                </p>
              )}
            </div>
            <hr />
            <button
              data-testid="add-submit-btn"
              type="submit"
              className="btn btn-warning"
            >
              Create
            </button>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
