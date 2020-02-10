import React, { useState, useEffect } from "react";
import { Popover, OverlayTrigger, Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  requestDeletePassword,
  requestEditPassword,
  setLoading
} from "../store/actions/";

export default function PasswordCard(props) {
  let dispatch = useDispatch();
  let { record } = props;
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

  // delete confirmation
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmClose = () => setShowConfirm(false);
  const handleConfirmShow = () => setShowConfirm(true);

  useEffect(() => {
    setUrl(record.url);
    setLogin(record.login);
    setPassword(record.password);
  }, [record.login, record.password, record.url]);
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
      requestEditPassword(record.id, {
        url,
        login,
        password
      })
    );
    handleClose();
  };

  const handleDelete = _ => {
    dispatch(setLoading());
    dispatch(requestDeletePassword(record.id));
    handleConfirmClose();
  };

  const handleCancel = () => {
    setUrl(record.url);
    setLogin(record.login);
    setPassword(record.password);
    handleClose();
  };
  const optionsPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Options</Popover.Title>
      <Popover.Content>
        <div onClick={handleConfirmShow}>
          <strong id="delete-option">Delete</strong>
        </div>
      </Popover.Content>
    </Popover>
  );

  const Options = () => (
    <OverlayTrigger
      rootClose={true}
      trigger="click"
      placement="right"
      overlay={optionsPopover}
    >
      <img
        src={require("../images/options-icon.png")}
        height="30"
        width="30"
        alt="3 Dots Clipart"
        id="options-icon"
        onClick={() => setShowConfirm(false)}
        data-testid="options-trigger"
      />
    </OverlayTrigger>
  );

  const sharePopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Share Options</Popover.Title>
      <Popover.Content>
        <strong>
          <a href="/">Share to...</a>
        </strong>
      </Popover.Content>
    </Popover>
  );

  const Share = () => (
    <OverlayTrigger
      rootClose={true}
      trigger="click"
      placement="right"
      overlay={sharePopover}
    >
      <img
        src={require("../images/people.png")}
        height="20"
        width="30"
        id="share-icon"
        alt="share-icon"
      />
    </OverlayTrigger>
  );
  return (
    <>
      <div className="card password-card" role="listitem">
        <div className="password-card-options">
          <Share />
          <Options />
        </div>
        <center>
          <div onClick={handleShow} data-testid="dummy-password-card">
            <img
              src={"http://logo.clearbit.com/" + record.url}
              // className="card-img-top"
              alt="record-logo"
              width="100"
              height="100"
            />
            <div className="card-body">
              <h5 className="card-title">{record.url}</h5>
              <p className="card-text">{record.login}</p>
            </div>
          </div>
        </center>
      </div>
      {/* Delete Modal */}
      <Modal show={showConfirm} onHide={handleConfirmClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure? This record will be removed forever!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Confirm Delete
          </Button>
          <Button variant="secondary" onClick={handleConfirmClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View/Edit Password Record</Modal.Title>
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
                data-testid="edit-url-input"
                value={url}
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
                data-testid="edit-login-input"
                value={login}
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
                data-testid="edit-password-input"
                value={password}
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
              data-testid="edit-submit-btn"
              type="submit"
              className="btn btn-warning"
            >
              Update
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              data-testid="cancel-submit-btn"
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
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
